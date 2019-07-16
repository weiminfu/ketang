import React, {Component} from 'react';
import {connect} from 'react-redux';

class Tip extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				未登录提示
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Tip);