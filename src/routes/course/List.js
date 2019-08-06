import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Carousel, Icon, Button} from "antd";
import action from '../../store/action/index';
import index from "postcss-normalize";
import {Link} from "react-router-dom";

class List extends Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
			isLoading: false
		};
	}
	
	async componentDidMount() {
		let {bannerData, queryBanner, courseData, queryList} = this.props;
		if (!bannerData || bannerData.length === 0) {
			queryBanner(); // 没有bannerData或长度为0，就dispatch派发获取数据
		}
		
		if (courseData.data.length === 0) {
			queryList();
		}
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		// 在当前案例中，触发这个生命周期函数，说明传递给组件的属性改变了（路由重新渲染或者是redux容器中的状态改变了）
		this.setState({isLoading: false});
	}
	
	queryType = () => {
		let {courseType} = this.props;
		let text = '全部课程';
		switch (courseType) {
			case 'react':
				text = 'REACT框架开发课程';
				break;
			case 'vue':
				text = 'VUE框架开发课程';
				break;
			case 'xiaochengxu':
				text = '小程序开发课程';
				break;
		}
		return text;
	};
	
	loadMore = () => {
		let {queryList, courseData, courseType} = this.props;
		
		// 防止重复点击和实现转圈功能
		if (this.isRun) return;
		this.isRun = true;
		this.setState({isLoading: true});
		
		// 重新发送新的dispatch:page是在当前page的基础上累加1，type一定要沿用当前筛选的type，
		// flag点击加载更多，是像redux容器中追加新获取的信息
		queryList({
			page: courseData.page + 1,
			type: courseType,
			flag: 'push'
		});
	};
	
	render() {
		this.isRun = false;// 点击加载更多，dispatch派发一个任务，通知
		// reducer更改容器中的状态信息，当状态信息改变会重新渲染组件（也就是重新执行render）此时我们把isRun设置为false，表示更新了数据。
		let {bannerData, courseData, courseType} = this.props;
		let {data} = courseData;
		return (
			<div className='listBox'>
				{/*轮播图*/}
				{bannerData && bannerData.length !== 0 ? (<Carousel autoplay={true}>
					{bannerData.map((item, index) => {
						let {pic, name} = item;
						return <div key={index}>
							<img src={pic} alt={name}/>
						</div>
					})}
				</Carousel>) : ''}
				
				{/*课程列表*/}
				<div className='courseList'>
					<h2><Icon type="menu-fold"/>{this.queryType()}</h2>
					{data && data.length !== 0 ? (<div>
						<ul>
							{data.map((item, index) => {
								let {name, pic, dec, id, time} = item;
								return <li key={index}>
									<Link to={{
										pathname: '/course/info',
										search: `?courseID=${id}`
									}}>
										<h3>{name}</h3>
										<div className='content'>
											<div className='pic'><img src={pic} alt={name}/></div>
											<div className='desc'>
												<p>{dec}</p>
												<p>时间：{time}</p>
											</div>
										</div>
									</Link>
								</li>
							})}
						</ul>
						{courseData.total <= courseData.page ? '' : (<Button type={"dashed"} onClick={this.loadMore}
						                                                     loading={this.state.isLoading}>加载更多</Button>)}
					</div>) : '暂无数据'}
				
				</div>
			</div>
		);
	}
}

export default connect(state => ({...state.course}), action.course)(List);