import React, {Component} from 'react';
import {connect} from 'react-redux';

class MyCourse extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				我的课程
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(MyCourse);