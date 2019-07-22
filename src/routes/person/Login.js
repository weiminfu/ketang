import React, {Component} from 'react';
import {connect} from 'react-redux';

/*import antd login form*/
import {Form, Icon, Input, Button, Checkbox,Modal} from 'antd';

/*import router*/
import {Link} from "react-router-dom";

/*md5加密*/
import md5 from 'blueimp-md5';

/*import login*/
import {login} from "../../api/person";

/*登录失败提示框*/
function loginFail() {
	let secondsToGo = 10;
	const modal = Modal.error({
		title: '登录失败',
		content: `请 ${secondsToGo} 秒钟后再尝试！.`,
	});
	const timer = setInterval(() => {
		secondsToGo -= 1;
		modal.update({
			content: `请 ${secondsToGo} 秒钟后再尝试!`,
		});
	}, 1000);
	setTimeout(() => {
		clearInterval(timer);
		modal.destroy();
	}, secondsToGo * 1000);
}

class Login extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	handleSubmit = ev => {
		ev.preventDefault();
		this.props.form.validateFields(async (err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);
				let {username, password} = values;
				password = md5(password);
				let result=await login({name: username, password: password});
				if (parseFloat(result.code)===0){
					this.props.history.go(-1);
					return ;
				}
				
				// 如果登录失败，弹窗提示框
				loginFail();
			}
		});
	};
	

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<div className={'personLoginBox'}>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [{required: true, message: 'Please input your username!'}],
						})(
							<Input
								prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
								placeholder="Username"
							/>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{required: true, message: 'Please input your Password!'}],
						})(
							<Input
								prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
								type="password"
								placeholder="Password"
							/>,
						)}
					</Form.Item>
					<Form.Item>
						{/*{getFieldDecorator('remember', {
						valuePropName: 'checked',
						initialValue: true,
					})(<Checkbox>Remember me</Checkbox>)}
					<a className="login-form-forgot" href="">
						Forgot password
					</a>*/}
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
						Or <Link to={'/person/register'}>register now!</Link>
					</Form.Item>
				</Form>
			</div>
		);
	}
}


/*在原来组件的基础上再高阶一下*/
export default Form.create({name: 'normal_login'})(connect()(Login));