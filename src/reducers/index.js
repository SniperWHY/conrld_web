import { combineReducers } from 'redux';
import {
	CHANGE_NAV_STATE,
} from '../action';

const navBar = (state = "", action) => {
	let copyState = state;
	if (action.type === CHANGE_NAV_STATE) {
		copyState = action.data;
		return copyState;
	}
	return state;
};

export default combineReducers({
	navBar
});