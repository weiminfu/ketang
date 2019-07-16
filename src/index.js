/*base*/
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

/*router redux*/
import {Provider} from 'react-redux';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

/*redux store*/
import store from './store/index';

/*antd*/
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

/*import css*/
import './static/css/reset.min.css';
import './static/css/common.less';

/*import component*/
import NavTop from "./component/NavTop";
import NavBottom from "./component/NavBottom";
import Home from "./routes/Home";
import MyCourse from "./routes/MyCourse";
import Person from "./routes/Person";


/*render*/
let root = document.getElementById('root');
ReactDOM.render(<Provider store={store}>
	<HashRouter>
		<LocaleProvider locale={zh_CN}>
			<div>
				{/*header*/}
				<NavTop></NavTop>
				
				{/*main => routes*/}
				<main className='container'>
					<Switch>
						<Route path={'/course'} component={Home}></Route>
						<Route path={'/mycourse'} component={MyCourse}></Route>
						<Route path={'/person'} component={Person}></Route>
						<Redirect to={'/course'}></Redirect>
					</Switch>
				</main>
				
				{/*footer*/}
				<NavBottom></NavBottom>
			</div>
		</LocaleProvider>
	</HashRouter>
</Provider>, root);

serviceWorker.unregister();
