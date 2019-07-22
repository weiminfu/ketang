import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Icon} from 'antd';

/*transition*/
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0
};

const transitionStyles = {
	entering: { opacity: 1},
	entered:  { opacity: 1},
	exiting:  { opacity: 0 },
	exited:  { opacity: 0 },
};

class NavTop extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			in:false
		};
	}
	
	render() {
		return (
			<header className={'headerNavBox'}>
				{/*首页的导航*/}
				<div className={'homeBox'}>
					<div className={'baseBox'}>
						<h1 className={'logo'}>课堂</h1>
						<Icon className={'icon'} type="bars" style={{
							fontSize:'.8rem'
						}} onClick={ev=>{
							this.setState({
								in:!this.state.in
							})
						}}/>
					</div>
					<Transition in={this.state.in} timeout={0}>
						{(state)=>{
							return <ul className={'filterBox'} style={{
								...defaultStyle,
								...transitionStyles[state],
								display:this.state.in?'block':'none'
							}}>
								<li>全部课程</li>
								<li>REACT课程</li>
								<li>VUE课程</li>
								<li>小程序课程</li>
							</ul>
						}}
					</Transition>
				</div>
			</header>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default withRouter(connect(
	mapStateToProps,
)(NavTop));