import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from "antd";
import {queryInfo, addShopCart, removeShopCart} from "../../api/course";
import Qs from 'qs';
import action from '../../store/action/index';

class Info extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			data: null,
			isShop: -1 // 存储是否已加入购物车中（-1是还没有加入购物车，0是已加入但是未支付，1是已支付）
		};
	}
	
	async componentDidMount() {
		let {location: {search}} = this.props;
		let {courseID = 0} = Qs.parse(search.substr(1)) || {};
		this.courseID = courseID; // 挂载到实例上是为了在其他方法中也可以调用
		let result = await queryInfo(courseID);
		if (parseFloat(result.code) === 0) {
			// 校验当前的课程是已支付还是未支付，或者还未加入购物车
			let {pay, unpay} = this.props.shopCart;
			let isShop = -1;
			
			// 在redux未购买和已购买的集合中筛选，是否有当前展示的课程，有的话说明当前课程已经加入到购物车了，没有说明还未加入
			unpay.find(item => {
				return parseFloat(item.id) === parseFloat(this.courseID) ? isShop = 0 : null;
			});
			pay.find(item => {
				return parseFloat(item.id) === parseFloat(this.courseID) ? isShop = 1 : null;
			});
			
			
			this.setState({data: result.data,isShop});
		}
	}
	
	render() {
		let {data,isShop} = this.state;
		if (!data) return '';
		return (
			<div className={'baseInfo'}>
				<video
					src="http://113.96.101.12/vlive.qqvideo.tc.qq.com/ATlk8EHzn77bpzGxLjvwnjyOX5HK5NEKkq9KHk0fDNtM/e0202yeyvsk.p201.1.mp4?vkey=EAA2AF8130FB873021D53E15C7ECFC856DF1D53AF2134E0099C5376135EC4AD27D33456BD558B50F28A91E58D613B89C5A952606613D357534A94D93C36D442F036C8AC0826113CA1359BD10846EB291D48B02A2D82683AAB0E7B344A15DF0DA56C236267784C94CCB8082EF6221DA53D7356CEC993FA387&platform=other&sdtfrom=&fmt=shd&level=0"
					controls preload={'none'} poster={data.pic}></video>
				<div className={'content'}>
					<h3>{data.name}</h3>
					<p>{data.dec}</p>
					<span>{data.price}</span>
					{isShop!==1?(<Button type={isShop===-1?'dashed':''} onClick={this.handleShopCart}>{isShop===-1?'加入购物车':'从购物车移除'}</Button>):''}
				</div>
			</div>
		);
	}
	
	handleShopCart =async (ev) => {
		if (this.state.isShop === -1) {
			// 还未加入购物车(按钮此时是：加入购物车)
			let result=await addShopCart(this.courseID);
			if (parseFloat(result.code)===0){
				this.props.queryUnpay(); // dispatch派发任务，通知redux容器中的购物车信息进行更新
				
				/*页面重新展示最新的样式*/
				this.setState({isShop:0});
			}
			
			return;
		}
		// 已经加入购物车(按钮此时是：移除购物车)
		let result=await removeShopCart(this.courseID);
		if (parseFloat(result.code)===0){
			this.props.queryUnpay(); // dispatch派发任务，通知redux容器中的购物车信息进行更新
			
			/*页面重新展示最新的样式*/
			this.setState({isShop:-1});
		}
	};
}

export default connect(state => state.course, action.course)(Info);