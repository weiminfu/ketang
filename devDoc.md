# 开发文档：一个完整的基于create-react-app官方脚手架的react项目——ketang

## 一、webstrom开发环境的设置

为避免语法报红，需要在webstrom开发环境中设置：

> File -> Setting -> Language & Frameworks -> JavaScript : JavaScript language version，下拉菜单，选择“React JSX”

## 二、安装create-react-app脚手架【安装耗时：60s】

> npm install create-react-app -g 把脚手架安装在全局环境下，目的：可以使用全局命令

## 三、基于create-react-app生成ketang项目【创建耗时：41s】

> create-react-app ketang 基于react脚手架命令，创建出一个名为“ketang”的自动化/工程化项目目录，和npm发包时候的命名规范一样，项目名称中不能出现：大写字母、中文汉字、特殊符号（中杠-和下划线_可以）等。

### 3.1生成的ketang项目中的目录及文件功能简介

#### node_modules目录

当前项目中依赖的包都安装在这里。

#### public目录

存放的是当前项目的HTML页面（单页面应用放一个index.html即可，多页面根据自己的需求放置需要的页面）。

#### src目录

项目结构中最主要的目录，因为后期所有的JS、路由、组件等都是放到这里面（包括需要编写的css或图片等）。

index.js是当前项目的主入口文件。

#### .gitignore文件

git提交的时候，需要忽略提交文件的配置项。

在其中添加忽略webstrom的‘.idea’文件的配置项到末尾：

```
# webStorm
.idea
```

#### package.json文件

基于脚手架生成的工程目录，自动帮我们安装了三个模块：
- react 模块
- react-dom 模块
- react-scripts 模块，集成了webpack需要的内容:
  - Babel一套
  - css处理一套
  - eslint一套
  - webpack一套
  - 其他的
  - 没有less、sass的处理内容（项目中使用less，我们需要自己额外的安装）

可配置的命令：

```
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}
```

可执行的脚本命令：npm run start / yarn start、npm run build /yarn build

> start：开发环境下，基于webpack编译处理，最后可以预览当前开发的项目成果（在webpack中安装了dev-server插件，基于这个插件会自动创建一个web服务【端口号默认是3000】，webpack会自动打开浏览器，并且展示我们的页面，并且能够监听我们代码的改变，如果代码改变了，webpack会自动重新编译，并且刷新浏览器来完成重新渲染）

> build：项目需要部署到服务器上时，我们先执行 yarn build ，把项目整体编译打包（完成后会在项目中生成一个build文件夹，这个文件夹中包含了所有编译后的内容，我们把它上传到服务器即可）；而且在服务器上进行部署的时候，不需要安装任何模块了，因为webpack已经把需要的内容都打包到一个JS中了。

### 3.2使用 yarn eject 命令暴露配置项，修改webpack配置项【耗时：85s】

> git add -A
>
> git commit -m'备注：暴露webpack配置项前的文件提交'  这一步是为下面暴露配置项做准备
>
> yarn eject 暴露配置项,一旦暴露后，项目目录中多了两个文件夹：config文件夹存放webpack的配置文件；scripts文件夹存放的是可执行脚步的JS文件，执行start命令时，运行的是该文件夹下是start.js，执行build命令时，运行的是build.js。在执行不同的JS文件时，会导入webpack.config.js配置文件，其中会判断是哪个执行环境，对应执行不同的webpack配置内容。

**暴露配置项后，可能出现的报错：**

```
报错：
./src/index.js
Error: [BABEL] C:\Users\Administrator\Desktop\ketang\src\index.js: Cannot find module '@babel/plugin-transform-react-jsx' (While processing: "C:\\Users\\Administrator\\Desktop\\ketang\\node_modules\\babel-preset-react-app\\index.js$1")
    at Array.reduce (<anonymous>)
    
问题：Cannot find module '@babel/plugin-transform-react-jsx-source'


报错：
./src/index.js
Error: [BABEL] C:\Users\Administrator\Desktop\ketang\src\index.js: Cannot find module '@babel/plugin-transform-react-jsx-source' (While processing: "C:\\Users\\Administrator\\Desktop\\ketang\\node_modules\\babel-preset-react-app\\index.js$1")
    at Array.reduce (<anonymous>)
    
问题：Cannot find module '@babel/plugin-transform-react-jsx-source'


报错：
./src/index.js
Error: [BABEL] C:\Users\Administrator\Desktop\ketang\src\index.js: Cannot find module '@babel/plugin-transform-react-jsx-self' (While processing: "C:\\Users\\Administrator\\Desktop\\ketang\\node_modules\\babel-preset-react-app\\index.js$1")
    at Array.reduce (<anonymous>)
    
问题：Cannot find module '@babel/plugin-transform-react-jsx-self'

分析原因：
在执行 yarn eject 导出配置文件后，node_modules下@babel目录中的三个依赖被删除，分别是：

plugin-transform-react-jsx文件夹
plugin-transform-react-jsx-self文件夹
plugin-transform-react-jsx-source文件夹

解决办法：重新安装缺失的配置文件
yarn add @babel/plugin-transform-react-jsx
yarn add @babel/plugin-transform-react-jsx-source
yarn add @babel/plugin-transform-react-jsx-self
```

### 3.3修改协议及配置端口号（可选项）

>$ set https=true&&yarn start 开启HTTPS协议模式（设置环境变量HTTPS的值）

>$ set port=63341&&yarn start 修改端口号，完成后页面加载的地址变成https://localhost:63341/

>$ set https=false&&set port=3000&&yarn start   将HTTP协议及端口号修改回来。

### 3.4安装less、less-loader，在webpack.config.js配置文件中，配置对less文件编译的支持

```
yarn add less less-loader
```

#### 3.4.1修改config目录下的webpack.config.js配置文件，在文件中添加对less的编译支持


```
Ctrl+F，搜索“style files regexes” 区域，编写less文件的正则匹配规则：
const lessRegex = /\.less$/;

Ctrl+F，搜索“test: sassRegex”，在它的后面添加less文件的配置内容：
{
  test: lessRegex,
  use: getStyleLoaders(
      {
        importLoaders: 2,
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
      'less-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},

```

### 3.5安装开发依赖

#### 3.5.1根据开发需要，规划依赖清单并依次安装

```
yarn add less：使用less编写css
yarn add less-loader：less文件的加载器，给webpack编译用的
yarn add antd:蚂蚁金服出的UI框架ant-design

yarn add react-swipe：轮播图插件
yarn add swipe-js-iso：轮播图插件
yarn add react-transition-group：支持react组件切换时的css3动画

yarn add prop-types：组件传递的属性设置规则
yarn add qs:该模块把url格式（age=12&name=wei）转换为json格式的字符串（{age:'12',name:'wei'}）。

yarn add redux：进行状态统一管理的类库（适用于任何技术体系的项目），基于它进行状态管理，实现组件之间的信息传递，可以应用在任何的项目中（vue、jq、react的都可以）
yarn add react-redux：专门给react项目提供的方案
yarn add redux-logger:能够在控制台清晰的展示出当前redux操作的流程和信息（原有状态、派发信息、修改后的状态信息）
yarn add redux-thunk:处理异步的dispatch派发
yarn add redux-promise：在dispatch派发的时候支持promise操作

yarn add react-router-dom: 安装react路由

yarn add axios：它是一个类库，基于Promise管理的AJAX库
yarn add blueimp-md5:加密

以上依赖安装的命令集成：
yarn add less less-loader antd react-swipe swipe-js-iso react-transition-group prop-types qs redux react-redux redux-logger redux-thunk redux-promise react-router-dom axios blueimp-md5
```

#### 3.5.2安装依赖可能会遇见的报错：

```
安装antd时遇见的报错：
C:\Users\Administrator\Desktop\ketang>yarn add antd 
yarn add v1.16.0
warning ..\..\package.json: No license field
[1/4] Resolving packages...
warning antd > rc-tree-select > rc-trigger > rc-animate > fbjs > core-js@1.2.7: core-js@<2.6.8 is no longer maintained. 
Please, upgrade to core-js@3 or at least to actual version of core-js@2.

解决antd安装失败的办法：
nrm ls查看当前可用源（*号在哪里表示使用哪个源）
nrm use taobao 切换到taobao源
npm install antd --save 使用npm安装

安装antd成功后的反馈结果：
+ antd@3.20.2
added 216 packages from 231 contributors, removed 410 packages, updated 1322 packages and audited 896728 packages in 241.737s
found 0 vulnerabilities

```


### 3.6构建工程化目录

#### 3.6.1前台：我们主要完成这个部分（前端部分）
```

ketang目录
    config目录
    node_modules目录
    public目录
    scripts目录
    src目录
        api目录
            index.js文件
        component目录
        routes目录
        static目录
            css目录
            images目录
        store目录
            action目录
                course.js文件，我的课程用到的redux
                index.js文件
                person.js文件，个人中心用到的redux
            reducer目录
                course.js文件，我的课程用到的redux
                index.js文件
                person.js文件，个人中心用到的redux
            action-types文件
            index.js文件
        utils目录
        index.js文件
        .gitignore文件
        package.json文件
        yarn.lock文件
    
```

#### 3.6.2后台：这是提供后台服务功能的（后端部分）
```
ketang-server目录
    json目录
    node_modules目录
    routes目录
    utils目录
    .gitignore文件
    config.js文件
    index.js文件
    package.json文件
    yarn.lock文件
    api接口文档.html文件
```


## 四、在GitHub上创建ketang仓库，方便团队协作开发

### 4.1在GitHub上创建ketang仓库

#### 4.1.1 登录GitHub账号： https://github.com/ 

#### 4.1.2 创建一个名为“ketang”的远程仓库
> New -> Repository name：填写仓库名称（项目名称）“ketang” -> Description (optional):填写仓库描述（项目简介）“A complete react project based on create-react-app.” -> Create repository 点击按钮创建仓库

### 4.2将本地ketang仓库和GitHub上的ketang仓库关联

#### 4.2.1复制GitHub上的ketang仓库地址：https://github.com/weiminfu/ketang.git

#### 4.2.2进入本地ketang仓库（ketang项目目录），右键打开Git Bash Here命令面板，执行下面的命令：


```
git remote add origin https://github.com/weiminfu/ketang.git 这是将本地仓库关联GitHub上的远程仓库
git remote -v 查看关联信息
git add -A 提交所有工作区文件到暂存区
git commit -m'备注：远程仓库与本地仓库关联' 提交所有暂存区文件到历史区
git push -u origin master 这是推送本地仓库历史区所有内容到GitHub仓库上
```

### 4.3在GitHub上再创建一个名为“ketang-server”的仓库，将提供后台服务功能的本地ketang-server仓库的代码上传

```
仓库名：ketang-server
仓库描述：Background services for Ketang project.

复制ketang-server仓库的链接：https://github.com/weiminfu/ketang-server.git

在和ketang仓库相同的目录下打开Git Bash Here命令面板，执行克隆ketang-server仓库的命令：
git clone https://github.com/weiminfu/ketang-server.git 会生成一个ketang-server目录，并且自动关联到了GitHub上的ketang-server仓库

复制后台项目ketang-server目录中的文件到新创建好的ketang-server本地仓库中

进入ketang-server本地仓库中，执行推送命令：
git add -A
git commit -m'ketang-server后台文件上传'
git push origin master

```

## 五、ketang项目的功能规划（页面结构）

### 5.1首页结构：一级路由
```
|--------------------------------------|
|             首页          导航条      |
| -------------------------------------|
|  |--------------------------------|  |
|  |          轮播图                 |  | 
|  |                                |  |
|  |                                |  |
|  |--------------------------------|  |
|                                      |
|  全部课程/REACT课程                   |
|                                      |
|  |--------------------------------|  |
|  |  课程列表：下拉刷新              |  | 
|  |                                |  |
|  |                                |  |
|  |                                |  |
|  |                                |  |
|  |                                |  |
|  |--------------------------------|  |
|                                      |
|                                      |
|--------------------------------------|
|  首页    我的课程   个人中心   导航条  |
| -------------------------------------|

```

#### 5.1.1课程详情页结构： 二级路由
```
|--------------------------------------|
|  返回        [课程名称]               |
| -------------------------------------|
|                                      |
| [视频]                               |
|  课程详情信息                         |
|                                      |
|                                      |
|                                      |
|                                      |
|                        |---------|   |
|                        | 购买课程 |   |
|                        |---------|   |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|--------------------------------------|
|  首页    我的课程   个人中心   导航条   |
| -------------------------------------|

```
### 5.2我的课程页结构： 一级路由
```
|--------------------------------------|
|  返回        我的课程                 |
| -------------------------------------|
|                                      |
|   未支付     已支付                   |
|   ------     ------                  |
|                                      |
|  |--------------------------------|  |
|  |  列表                          |  | 
|  |                                |  | 
|  |  |--------------------------|  |  |
|  |  |                    勾选  |  |  | 
|  |  |                          |  |  | 
|  |  |--------------------------|  |  |
|  |                                |  |
|  |  |--------------------------|  |  |
|  |  |                    勾选  |  |  | 
|  |  |                          |  |  | 
|  |  |--------------------------|  |  |
|  |                                |  |
|  |                                |  |
|  |            支付                |  |
|  |--------------------------------|  |
|                                      |
|                                      |
|--------------------------------------|
|  首页    我的课程   个人中心   导航条  |
| -------------------------------------|

```

### 5.3个人中心页结构：一级路由
```
|--------------------------------------|
|  返回        个人中心                 |
| -------------------------------------|
|    显示用户的基本信息：                |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                           退出登录    |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|--------------------------------------|
|  首页    我的课程   个人中心   导航条  |
| -------------------------------------|

```

#### 5.3.1注册页结构： 二级路由
```
|--------------------------------------|
|  返回        注册                     |
| -------------------------------------|
|    昵称：                             |
|    邮箱：                             |
|    手机：                             |
|    密码：                             |
|    确认密码：                         |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                           注册       |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|--------------------------------------|
|  首页    我的课程   个人中心   导航条  |
| -------------------------------------|

```
#### 5.3.2登录页结构：二级路由
```
|--------------------------------------|
|  返回        登录                     |
| -------------------------------------|
|    用户名：                           |
|    密码：                             |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                                      |
|                           登录       |
|                                      |
|                                      |
|    还没有账号？ 立即注册>>             |
|                                      |
|                                      |
|--------------------------------------|
|  首页    我的课程   个人中心   导航条  |
| -------------------------------------|

```

## 六、配置redux工程化目录

### 6.1进入ketang -> src -> store -> reducer

#### 6.1.1创建reducer：course.js文件：

```
import * as TYPES from '../action-types';

let INIT_STATE={};
export default function course(state=INIT_STATE,action) {
	// 深度克隆state
	state=JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case TYPES.xyz:
			break;
	}
	return state;
}

```
#### 6.1.2创建reducer： person.js文件：


```
import * as TYPES from '../action-types';

let INIT_STATE={};
export default function person(state=INIT_STATE,action) {
	// 深度克隆state
	state=JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case TYPES.xyz:
			break;
	}
	return state;
}

```

#### 6.1.3合并reducer： index.js文件：


```
import {combineReducers} from 'redux';
import course from './course';
import person from './person';

let reducer=combineReducers({
	course,
	person,
});
export default reducer;
```

### 6.2进入ketang -> src -> store -> action

#### 6.2.1创建action： course.js文件：


```
import * as TYPES from '../action-types';

let course={};
export default course;
```
#### 6.2.2创建action： person.js文件：

```
import * as TYPES from '../action-types';

let person={};
export default person;
```

#### 6.2.3合并action： index.js文件：

```
import course from './course';
import person from './person';

let action={
	course,
	person,
};
export default action;
```

#### 6.3创建store：store -> index.js文件（带redux-logger、redux-thunk、redux-promise三大中间件）：


```
import {createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import reducer from './reducer/index';

let store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk, reduxPromise));
export default store;

```

## 七、配置router一级路由

### 7.1进入ketang -> src -> component目录

#### 7.1.1创建公共组件：头部导航NavTop.js


```
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Icon} from 'antd';

/*transition*/
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0,
};

const transitionStyles = {
	entering: { opacity: 1 },
	entered:  { opacity: 1 },
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
								...transitionStyles[state]
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
```

#### 7.1.2创建公共组件：底部导航NavBottom.js


```
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,NavLink} from 'react-router-dom';

import {Icon} from 'antd';

class NavBottom extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<footer className={'footerNavBox'}>
				<NavLink to="/course">
					<Icon type="home" />
					<span>首页</span>
				</NavLink>
				<NavLink to="/mycourse">
					<Icon type="read" />
					<span>我的课程</span>
				</NavLink>
				<NavLink to="/person">
					<Icon type="user" />
					<span>个人中心</span>
				</NavLink>
			</footer>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default withRouter(connect(
	mapStateToProps,
)(NavBottom));
```

### 7.2进入ketang -> src -> routes目录

#### 7.2.1创建首页组件：Home.js


```
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
```
#### 7.2.2创建我的课程组件：MyCourse.js


```
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
```
#### 7.2.3创建个人中心组件：Person.js


```
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
```

#### 7.2.4在routes目录下分别创建course目录、person目录、mycourse目录，分别对应存放一级路由Home.js、一级路由MyCourse.js、一级路由Person.js的二级路由内容。

### 7.3进入ketang -> src -> index.js文件

#### 7.3.1配置路由


```
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

```

## 八、头部和底部导航开发

### 8.1 进入ketang -> src -> component -> NavTop.js文件

#### 8.1.1 NavTop.js组件开发：


```
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Icon} from 'antd';

/*transition*/
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0,
};

const transitionStyles = {
	entering: { opacity: 1 },
	entered:  { opacity: 1 },
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
								...transitionStyles[state]
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
```
#### 8.1.2 NavTop.js组件配套的less样式：
ketang -> src -> static -> css -> common.less

```
/*import antd.css*/
@import "~antd/dist/antd.css";

/*rem*/
html {
  font-size: 100px; /*750:1rem=100px*/
}

#root {
  margin: 0 auto;
  max-width: 750px;
}

/*NavTop*/
.headerNavBox {
  @BG: #2A2A2A;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 1.12rem;
  line-height: 1.12rem;
  background: @BG;
  color: #ffffff;

  .homeBox {
    height: 100%;

    .baseBox {
      position: relative;
      height: 100%;

      .logo {
        position: absolute;
        left: .16rem;
        top: 50%;
        margin-top: -.31rem;
        width: 2.1rem;
        height: .62rem;
        font-size: 0;
        background: url("../images/logo.png") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
      }

      .icon {
        position: absolute;
        right: .16rem;
        top: 50%;
        margin-top: -.4rem;
      }
    }

    .filterBox {
      position: absolute;
      top: 1.1rem;
      left: 0;
      z-index: 999;
      padding: 0 .56rem;
      width: 100%;
      background: @BG;

      li {
        font-size: .32rem;
        line-height: 1.1rem;
        text-align: center;
        color: #ffffff;
        border-top: .02rem solid lighten(@BG, 20%); /*lighten（）是less提供的减轻颜色的方法*/
      }
    }
  }
}
```
### 8.2 进入ketang -> src -> component -> NavBottom.js文件

#### 8.2.1 NavBottom.js组件开发：


```
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,NavLink} from 'react-router-dom';

import {Icon} from 'antd';

class NavBottom extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<footer className={'footerNavBox'}>
				<NavLink to="/course">
					<Icon type="home" />
					<span>首页</span>
				</NavLink>
				<NavLink to="/mycourse">
					<Icon type="read" />
					<span>我的课程</span>
				</NavLink>
				<NavLink to="/person">
					<Icon type="user" />
					<span>个人中心</span>
				</NavLink>
			</footer>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default withRouter(connect(
	mapStateToProps,
)(NavBottom));
```
#### 8.2.2 NavBottom.js组件对应的less样式：
ketang -> src -> static -> css -> common.less


```
/*NavBottom*/
.footerNavBox{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  width: 100%;
  height: 1.06rem;
  line-height: 1.06rem;
  border-top: .02rem solid #D5D5D5;


  display: flex;
  a{
    flex: 1;
    text-align: center;
    color: #2A2A2A;

    i{
      display: block;
      margin-top: .12rem;
      font-size: .4rem;
    }

    span{
      display: block;
      height: .5rem;
      line-height: .5rem;
      font-size: .32rem;
    }

    &.active{
      color: #9D0800;
      font-weight: bold;
    }
  }
}
```
## 九、启动ketang-server后台服务

**进入ketang-server项目**

### 9.1 跑环境：安装缺失的node_modules中的依赖

在命令窗口中执行初始化命令：
```
yarn install
或者
npm install
```

### 9.2 打开index.js文件，把允许跨越的配置打开：

react脚手架生成的项目是在localhost：3000下，服务器的端口是localhost：8000，所有需要进行跨域配置：

```
const CONFIG = require('./config'),
    PERSONAL_PATH = './json/personal.json',
    COURSE_PATH = './json/course.json',
    STORE_PATH = './json/store.json';

/*-CREATE SERVER-*/
const express = require('express'),
    app = express();
app.listen(CONFIG.PORT, () => {
    console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：${CONFIG.PORT}`);
});

/*-MIDDLE WARE-*/
//=>实现CROS跨域的中间件
app.use((req, res, next) => {
    const {ALLOW_ORIGIN, CREDENTIALS, HEADERS, ALLOW_METHODS} = CONFIG.CROS;
    res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
    res.header("Access-Control-Allow-Credentials", CREDENTIALS);
    res.header("Access-Control-Allow-Headers", HEADERS);
    res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
    req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});

//=>实现SESSION操作的中间件
const session = require('express-session');
app.use(session(CONFIG.session));

//=>把所有POST请求，请求主体传递的内容进行解析，把URL-ENCODED格式转换为对象，存放到REQ.BODY属性上的
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//=>在所有的请求开始之前，把JSON中的数据获取到，挂载到REQ的某些属性上，以后想获取，直接的从属性读取即可
const {readFile} = require('./utils/promiseFS');
app.use(async (req, res, next) => {
    req.personalDATA = JSON.parse(await readFile(PERSONAL_PATH));
    req.courseDATA = JSON.parse(await readFile(COURSE_PATH));
    req.storeDATA = JSON.parse(await readFile(STORE_PATH));
    next();
});

/*-ROUTE-*/
//=>EXPRESS中的路由管控，例如：请求的API接口地址是 '/personal/xxx' ，直接进入到 './routes/personal' 这个模块执行代码
app.use('/course', require('./routes/course'));
app.use('/personal', require('./routes/personal'));
app.use('/store', require('./routes/store'));
app.use((req, res, next) => {
    res.status(404);
    res.send('NOT FOUND!');
});
```

### 9.3 启动后台服务器

在ketang-server目录下，右键调出DOS的cmd命令窗口，执行：

```
yarn start_server
```

提示启动服务成功后，就可以通过api接口跨域请求到这个服务器上的数据了。

## 十、创建个人中心二级路由和实现登录权限校验逻辑

### 10.1创建个人中心下的四个二级路由

个人中心下对应有：登录状态、未登录状态、登录功能、注册功能四个二级路由。

**进入 ketang -> src -> routes -> person目录：**

#### 10.1.1 创建登录状态下的二级路由:Info.js展示个人中心信息

```
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
```
#### 10.1.2 创建未登录状态下的二级路由:Tip.js提示未登录状态

```
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
```

#### 10.1.3 创建有登录功能的二级路由:Login.js提供登录功能

```
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Login extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				登录
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Login);
```

#### 10.1.4 创建有注册功能的二级路由:Register.js提供注册功能

```
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Register extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		return (
			<div>
				注册
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Register);
```

### 10.2在个人中心一级路由下配置二级路由

**进入 ketang -> src -> routes -> Person.js文件**


```
render() {
		return (
			<section>
			    {/*配置个人中心的二级路由*/}
				<Switch>
					{/*
					// 路由的验证和渲染是同步的，不允许在校验中出现异步，
					// 因为这样在异步没有完成之前，根本不知道渲染谁，语法
					// 不支持这样的操作。
					<Route path={'/person/info'} render={async ()=>{
						// 是否登录的权限校验
						let result=await checkLogin();
						if (parseFloat(result.code)===0){
							return <Info/>;
						}
						return <Tip/>;
					}}/>
					*/}
					
					<Route path={'/person/info'} render={() => {
						if (this.state.isLogin) {
							return <Info/>;
						}
						return <Tip/>;
					}}/>
					
					<Route path={'/person/login'} component={Login}/>
					<Route path={'/person/register'} component={Register}/>
					<Redirect from={'/person'} to={'/person/info'}/>
				</Switch>
			</section>
		);
	}
```
### 10.3个人中心登录状态的权限校验

真实的react、vue项目中，我们会把所有向服务器发送具体请求的操作写在api目录中（不写在组件内部，方便请求处理的统一管理。

**进入 ketang -> src -> api目录**

#### 10.3.1 在index.js文件中对axios或fetch进行初始处理或二次封装


```
/*
* 真实的react、vue项目中，我们会把所有向服务器发送具体请求的操作写
* 在api目录中（不写在组件内部，方便请求处理的统一管理）。
*
* index：是把axios或fetch等进行初始处理或二次封装的地方，以后在别的地
* 方用到的axios、fetch都是经过处理的。
* */

import axios from 'axios';
import Qs from 'qs';

// 请求的基础地址配置
axios.defaults.baseURL = 'http://localhost:8000';

// 是否允许跨越并携带cookie：从3000端口访问8000端口，需要跨越并携带cookie
axios.defaults.withCredentials = true;

// 把post、put请求方式，通过请求主体传递给服务器的data内容通
// 过Qs.stringify(date）方法统一转换为x-www-url-encoded的格式（name=wei&age=12）
axios.defaults.transformRequest = (data = {}) => Qs.stringify(data);

// 响应拦截器：把服务器返回的信息中的响应主体内容拦截返回，以后在then中获取的结果就是主体内容
axios.interceptors.response.use(result => result.data);

export default axios;
```

#### 10.3.2 创建person.js文件，处理个人中心组件中的服务器请求：封装成为方法，可以在组件内部直接调用执行。

根据api文档中对应的api接口，配置不同的请求方法：

```
/*
* 个人中心的所有请求都放在这里处理
* */
import axios from './index';

// 验证是否登录
export function checkLogin() {
	return axios.get('/personal/login');
}
```
#### 10.3.3 路由内进行同步的权限校验与组件渲染

进行权限校验需要向服务器发送api请求，获取登录状态校验码，把校验码对应的状态获取到之后，挂载到个人中心组件的this.state上，在对个人中心的二级路由进行同步校验与渲染的时候，从this.state上获取到登录的状态信息，从而在这个二级路由中对应显示匹配的组件。

**在组件渲染之前，通过向服务器发送请求，把获得到的登录状态信息挂载到组件的this.state上：**


```
    constructor(props, context) {
		super(props, context);
		
		// state
		this.state = {
			isLogin: false
		};
	}
	
	// 渲染组件前向服务器发送请求，获取登录的状态信息，然后挂载到this.state上
	async componentWillMount() {
		let result = await checkLogin();
		let isLogin = parseFloat(result.code) === 0;
		// let isLogin = true;
		this.setState({
			isLogin
		});
	}
```

**渲染组件的时候，在路由中检验登录状态，根据this.state的信息显示不同的组件：**

```
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';

import Login from "./person/Login";
import Register from "./person/Register";

/*import api*/
import {checkLogin} from '../api/person';
import Info from "./person/Info";
import Tip from "./person/Tip";

class Person extends Component {
	constructor(props, context) {
		super(props, context);
		
		// state
		this.state = {
			isLogin: false
		};
	}
	
	// 渲染组件前向服务器发送请求，获取登录的状态信息，然后挂载到this.state上
	async componentWillMount() {
		let result = await checkLogin();
		let isLogin = parseFloat(result.code) === 0;
		// let isLogin = true;
		this.setState({
			isLogin
		});
	}
	
	render() {
		return (
			<section>
				{/*配置个人中心的二级路由*/}
				<Switch>
					{/*
					// 路由的验证和渲染是同步的，不允许在校验中出现异步，
					// 因为这样在异步没有完成之前，根本不知道渲染谁，语法
					// 不支持这样的操作。
					<Route path={'/person/info'} render={async ()=>{
						// 是否登录的权限校验
						let result=await checkLogin();
						if (parseFloat(result.code)===0){
							return <Info/>;
						}
						return <Tip/>;
					}}/>
					*/}
					
					{/*通过检验this.state的isLogin值，对应在路由中渲染不同的组件*/}
					<Route path={'/person/info'} render={() => {
						if (this.state.isLogin) {
							return <Info/>;
						}
						return <Tip/>;
					}}/>
					
					<Route path={'/person/login'} component={Login}/>
					<Route path={'/person/register'} component={Register}/>
					<Redirect from={'/person'} to={'/person/info'}/>
				</Switch>
			</section>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
)(Person);
```
















