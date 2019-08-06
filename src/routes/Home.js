import React, {Component} from 'react';
// import {connect} from 'react-redux';
import {Route,Switch,Redirect} from "react-router-dom";
import List from "./course/List";
import Info from "./course/Info";
import '../static/css/course.less';

class Home extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<section className='courseBox'>
				<Switch>
					<Route path={'/course'} exact component={List}/>
					<Route path={'/course/info'} component={Info}/>
				</Switch>
			</section>
		);
	}
}

export default Home;