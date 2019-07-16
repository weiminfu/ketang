import React, {Component} from 'react';
import {connect} from 'react-redux';

class Home extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				首页
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Home);