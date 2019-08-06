import React, {Component} from 'react';
import {connect} from 'react-redux';
import action from '../../store/action/index';
import CourseItem from './CourseItem';
import {checkLogin} from "../../api/person";
import {Alert} from "antd";
import {Link} from "react-router-dom";

class Pay extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			isLogin:false
		};
	}
	
	async componentDidMount() {
		let result=await checkLogin();
		if (parseFloat(result.code)===0){
			this.setState({isLogin:true});
		}
	}
	
	render() {
		if (this.state.isLogin === false) {
			return <Link to={'/person/login'}>
				<Alert
					message="提示："
					description="当前未登录账号，请先登录！【点我登录】"
					type="warning"
					style={{marginTop:".2rem"}}
				/>
			</Link>;
		}
		
		let {pay}=this.props.shopCart;
		if (pay.length===0){
			return <Alert
					message="提示："
					description="当前账户没有已支付的课程！"
					type="warning"
					style={{marginTop:".2rem"}}
				/>;
		}
		
		return (
			<ul className={'courseItem'}>
				{pay.map((item,index)=>{
					return <CourseItem key={index} item={item}/>;
				})}
			</ul>
		);
	}
}

export default connect(state=>state.course,action.course)(Pay);