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
