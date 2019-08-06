import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form,Icon,Button,Input,Row,Col,Modal} from "antd";
import md5 from 'blueimp-md5';
import {register} from "../../api/person";
import action from '../../store/action/index';


/*注册失败提示框*/
function registerFail() {
	let secondsToGo = 10;
	const modal = Modal.error({
		title: '注册失败',
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

class Register extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll(async (err, values) => {
			if (!err) {
				values.password=md5(values.password);
				let result=await register(values);
				if (parseFloat(result.code)===0){
					this.props.queryBaseInfo();// 注册成功后需要从服务器重新获取数据来更新redux的state值【登录成功时同样的操作】
					this.props.history.push('/person');
					return;
				}
				registerFail();
			}
		});
	};
	
	render() {
		/*验证规则的方法*/
		const { getFieldDecorator } = this.props.form;
		
		/*布局的样式*/
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		return (
			<section className='personLoginBox'>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item label={'用户名'}>
						{getFieldDecorator('name',{
							rules:[
								{required:true,message:'请输入用户名'},
							]
						})(<Input/>)}
					</Form.Item>
					<Form.Item label={'邮箱'}>
						{getFieldDecorator('email',{
							rules:[
								{required:true,message:'请输入邮箱'},
								{type:'email',message:'输入的邮箱格式不正确'}
							]
						})(<Input/>)}
					</Form.Item>
					<Form.Item label={'手机'}>
						{getFieldDecorator('phone',{
							rules:[
								{required:true,message:'请输入手机号'}
							]
						})(<Input/>)}
					</Form.Item>
					<Form.Item label={'密码'}>
						{getFieldDecorator('password',{
							rules:[
								{required:true,message:'请输入密码'}
							]
						})(<Input/>)}
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							立即注册
						</Button>
					</Form.Item>
				</Form>
			</section>
		);
	}
}


// connect方法的第一个参数设为null
export default Form.create({ name: 'register' })(connect(
	null,action.person
)(Register));