import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Menu} from "antd";
import '../static/css/MyCourse.less';
import Unpay from "./mycourse/Unpay";
import Pay from "./mycourse/Pay";

class MyCourse extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			// 根据当前的路由地址，验证初始选中的Menu到底是pay还是unpay
			current: this.props.location.pathname === '/mycourse/pay' ? 'pay' : 'unpay'
		};
	}
	
	handleClick = (ev) => {
		// antd的Menu组件，在点击的时候，把事件对象重构了（用自己构建的值替换了事件对象）
		this.setState({
			current: ev.key
		});
		
		// 点击跳转到指定的路由位置
		this.props.history.push(ev.key === 'pay' ? '/mycourse/pay' : '/mycourse');
	};
	
	render() {
		return (
			<section className={'MyCourseBox'}>
				<Menu
					onClick={this.handleClick}
					selectedKeys={[this.state.current]}
					mode="horizontal">
					<Menu.Item key={'unpay'}>未支付</Menu.Item>
					<Menu.Item key={'pay'}>已支付</Menu.Item>
				</Menu>
				
				<Switch>
					<Route path={'/mycourse'} exact component={Unpay}/>
					<Route path={'/mycourse/pay'} component={Pay}/>
				</Switch>
			</section>
		);
	}
}

export default MyCourse;