import React, {Component} from 'react';
import {connect} from 'react-redux';
import action from '../../store/action/index';
import CourseItem from './CourseItem';
import {Alert,Button} from "antd";
import {removeShopCart,payShopCart} from "../../api/course";
import {checkLogin} from "../../api/person";

class Unpay extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		let {unpay}=this.props.shopCart;
		if (unpay.length === 0) {
			return <Alert
				message="提示："
				description="当前购物车无准备购买的商品"
				type="warning"
				style={{marginTop:".2rem"}}
			/>
		}
		return (
			<div>
				<div style={{
					marginTop:'.2rem',
					height:'.7rem',
					lineHeight:'.7rem',
					padding:'0 .1rem'
				}}>
					<input
						type="checkbox"
						checked={this.props.selectAll}
						onChange={this.props.handleSelect.bind(this,'all')}/>
						全选 / 全不选
					<Button type='dashed' style={{marginLeft:'.8rem'}} onClick={this.handleRemove}>删除</Button>
					<Button type='dashed' style={{marginLeft:'.3rem'}} onClick={this.handlePay}>支付</Button>
				</div>
				<ul className={'courseItem'}>
					{unpay.map((item,index)=>{
						return <CourseItem key={index} item={item} input={true}/>;
					})}
				</ul>
			</div>
		);
	}
	
	handleRemove=()=>{
		// 获取所有被选中项的ID
		let selectIDList=[];
		this.props.shopCart.unpay.forEach(item=>{
			if (item.check){
				selectIDList.push(item.id);
			}
		});
		
		if (selectIDList.length===0) {
			alert('没有要被删除的信息!');
			return;
		}
		
		// 根据ID发送删除的请求：生成每一个axios删除操作返回的promise组成的数组，基于promise.all验证是否都完成
		selectIDList=selectIDList.map((courseID,index)=>{
			return removeShopCart(courseID);
		});
		Promise.all(selectIDList).then(()=>{
			this.props.queryUnpay(); // dispatch更新redux信息
		});
	};
	
	handlePay=async ()=>{
		// 点击支付，首先要验证当前是否登录
		let result=await checkLogin();
		if (parseFloat(result.code) !== 0) {
			alert('请先登录账号，再进行支付交易！');
			this.props.history.push('/person/login');
			return ;
		}
		
		// 支付类似于上面的删除
		// 获取所有被选中项的存储ID（storeID）
		let selectIDList=[];
		this.props.shopCart.unpay.forEach(item=>{
			if (item.check){
				selectIDList.push(item.storeID);
			}
		});
		
		if (selectIDList.length===0) {
			alert('没有要被删除的信息!');
			return;
		}
		
		// 根据ID发送删除的请求：生成每一个axios删除操作返回的promise组成的数组，基于promise.all验证是否都完成
		selectIDList=selectIDList.map((storeID,index)=>{
			return payShopCart(storeID);
		});
		Promise.all(selectIDList).then(()=>{
			this.props.queryUnpay(); // dispatch更新redux信息
			this.props.queryPay();
		});
		
	};
}

export default connect(state=>state.course,action.course)(Unpay);