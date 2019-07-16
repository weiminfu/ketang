import React, {Component} from 'react';
import {connect} from 'react-redux';

class Person extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				个人中心
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Person);