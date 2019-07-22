import * as TYPES from '../action-types';
import {queryInfo} from '../../api/person';

let person={
	queryBaseInfo(){
		return {
			type:TYPES.PERSON_QUERY_BASE,
			// queryInfo执行得到的是一个promise实例，而中间件redux-promise在
			// 获取promise实例后继续派发任务给reducer
			payload:queryInfo()
		}
	}
};
export default person;