import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Button} from 'antd';
import {exitLogin} from '../../api/person';

import action from '../../store/action/index';

class Info extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	// 在加载前都先获得baseInfo，判断是否有数据
	componentWillMount() {
		let {baseInfo,queryBaseInfo}=this.props;
		if (!baseInfo) {
			queryBaseInfo();
		}
	}
	
	render() {
		let {baseInfo}=this.props;
		if (!baseInfo) return'';
		let {name,phone,email}=baseInfo;
		return (
			<div className={'personBaseInfo'}>
				<p>
					<span>用户名：</span>
					<span>{name}</span>
				</p>
				<p>
					<span>邮箱：</span>
					<span>{email}</span>
				</p>
				<p>
					<span>电话：</span>
					<span>{phone}</span>
				</p>
				<Button type='danger' onClick={async (ev)=>{
					await exitLogin();
					this.props.history.push('/person');
				}}>退出登录</Button>
			</div>
		);
	}
}



export default withRouter(connect(state=>({...state.person}),action.person)(Info));