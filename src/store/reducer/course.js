import * as TYPES from '../action-types';

let INIT_STATE = {
	bannerData: [],
	courseData: {
		total: 100,
		limit: 10,
		page: 1,
		data: []
	},
	courseType: 'all',
	shopCart: {
		unpay: [],
		pay: []
	},
	selectAll: true, //存储的是全选还是全不选
};
export default function course(state = INIT_STATE, action) {
	// 深度克隆state
	state = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		// 获取轮播图数据
		case TYPES.COURSE_QUERY_BANNER:
			let {code, data} = action.payload;
			if (parseFloat(code) === 0) {
				state.bannerData = data;
			}
			break;
		
		// 获取课程列表信息
		case TYPES.COURSE_QUERY_LIST:
			let {result, flag, courseType} = action;
			state.courseType = courseType;
			if (parseFloat(result.code) === 0) {
				state.courseData.total = parseFloat(result.total);
				state.courseData.limit = parseFloat(result.limit);
				state.courseData.page = parseFloat(result.page);
				if (flag === 'push') {
					// state.courseData.data.push(...result.data);
					state.courseData.data = state.courseData.data.concat(result.data);
				} else {
					state.courseData.data = result.data;
				}
			}
			break;
		
		// 获取已支付和未支付的购物车信息
		case TYPES.COURSE_UNPAY:
			if (parseFloat(action.result.code) === 0) {
				state.shopCart.unpay = action.result.data;
				// 给unpay中的每一个数据加一个选中与否的属性
				state.shopCart.unpay = state.shopCart.unpay.map((item, index) => {
					return {...item, check: true};
				});
				state.selectAll=true;
			}
			break;
		
		case TYPES.COURSE_PAY:
			if (parseFloat(action.result.code) === 0) {
				state.shopCart.pay = action.result.data;
			}
			break;
		
		case TYPES.COURSE_HANDLE:
			let mode = action.mode;
			if (mode === 'all') {
				state.selectAll = !state.selectAll;
				state.shopCart.unpay = state.shopCart.unpay.map((item, index) => {
					return {...item, check: state.selectAll};
				})
			} else {
				let item=state.shopCart.unpay.find(item=>{
					return parseFloat(item.id)===mode;
				});
				item.check=!item.check;
				// 注意：需要验证是否所有的课程都是被选中了，如果是，全选也要被选中
				let f=state.shopCart.unpay.find(item=>{
					return item.check===false; //能找到有一项非选中，则说明是非全选
				});
				state.selectAll = !f;
			}
			break;
	}
	return state;
}

/*
*limit、page、total 每一次从服务器获取信息后都要更新
* 1.第一次获取数据或者点击加载更多获取其他页的数据，都是把最新获取的这
* 几条数据追加到courseData.data中，limit、page、total可以更换
*
* 2.点击筛选的时候，应该是把获取的数据信息，替换courseData.data
*
* => dispatch派发的时候，还需要传递一个标识：flag-push、flag-replace,
* 代表是追加还是替换，根据标识，我们完成对应的操作。
*
* 3.在redux容器中还需要记录一个信息，当前课程的类型：all、react、vue...由此来更新标题的信息
* */