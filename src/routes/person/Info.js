import React, {Component} from 'react';
import {connect} from 'react-redux';

class Info extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				个人信息
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Info);