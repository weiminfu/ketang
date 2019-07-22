import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import Login from "./person/Login";
import Register from "./person/Register";

/*import api*/
import {checkLogin} from '../api/person';

/*import component*/
import Info from "./person/Info";
import Tip from "./person/Tip";

/*import less*/
import '../static/css/person.less';

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
		let isLogin = parseFloat(result.code) === 0 ? true : false;
		// let isLogin = true;
		this.setState({
			isLogin
		});
	}
	
	
	/*
	* 我们之前聊过，当路由切换的时候，对应的组件会重新渲染，但是渲染也要分情况：
	*
	*   1.之前渲染其他组件的时候，把当前组件彻底从页面移除，再次渲染当前组件，
	* 走的是第一次挂载的流程（也就是一切从头开始）
	*
	*   2.如果当前组件之前没有彻底从页面中移除（本组件内部的子组件在切换），每一次走的是更新的流程，不是重新挂载的流程。
	* */
	
	async componentWillUpdate() {
		let result = await checkLogin();
		let isLogin = parseFloat(result.code) === 0 ? true : false;
		this.setState({isLogin});
	}
	
	/*针对组件销毁后依然存在异步请求设置state时导致的内存泄漏警告的解决办法：*/
	componentWillUnmount = () => {
		this.setState = (state,callback)=>{
			return '';
		};
	};
	
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
						// 基于render返回的组件不是受路由管控的组件
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