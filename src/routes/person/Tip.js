import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert,Button} from 'antd';

// 用withRouter把组件包一下，变成受路由管控的组件
import {withRouter} from 'react-router-dom';

class Tip extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				<Alert
					message="未登录提醒"
			        description="您当前未登录账号，请先登录，再查看个人信息！"
			        type="warning"
				/>
				<Button type='dashed' onClick={ev=>{
					this.props.history.push('/person/login')
				}}>立即登录</Button>
				<Button type='dashed' onClick={ev=>{
					this.props.history.push('/person/register')
				}}>立即注册</Button>
			</div>
		);
	}
}


export default withRouter(connect()(Tip));