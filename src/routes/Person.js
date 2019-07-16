import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import Login from "./person/Login";
import Register from "./person/Register";

/*import api*/
import {checkLogin} from '../api/person';
import Info from "./person/Info";
import Tip from "./person/Tip";

class Person extends Component {
	constructor(props, context) {
		super(props, context);
		
		// state
		this.state = {
			isLogin: false
		};
	}
	
	// 渲染组件前向服务器发送请求，获取登录的状态信息，然后挂载到this.state上
	async componentWillMount() {
		let result = await checkLogin();
		let isLogin = parseFloat(result.code) === 0;
		// let isLogin = true;
		this.setState({
			isLogin
		});
	}
	
	render() {
		return (
			<section>
				{/*配置个人中心的二级路由*/}
				<Switch>
					{/*
					// 路由的验证和渲染是同步的，不允许在校验中出现异步，
					// 因为这样在异步没有完成之前，根本不知道渲染谁，语法
					// 不支持这样的操作。
					<Route path={'/person/info'} render={async ()=>{
						// 是否登录的权限校验
						let result=await checkLogin();
						if (parseFloat(result.code)===0){
							return <Info/>;
						}
						return <Tip/>;
					}}/>
					*/}
					
					{/*通过检验this.state的isLogin值，对应在路由中渲染不同的组件*/}
					<Route path={'/person/info'} render={() => {
						if (this.state.isLogin) {
							return <Info/>;
						}
						return <Tip/>;
					}}/>
					
					<Route path={'/person/login'} component={Login}/>
					<Route path={'/person/register'} component={Register}/>
					<Redirect from={'/person'} to={'/person/info'}/>
				</Switch>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Person);