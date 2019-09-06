import { combineReducers } from 'redux';
import {
	CHANGE_NAV_STATE,
	CHANGE_REGISTER_CURRENT,
} from '../action';

const navBar = (state = "", action) => {
	let copyState = state;
	if (action.type === CHANGE_NAV_STATE) {
		copyState = action.data;
		return copyState;
	}
	return state;
};

const register = (state = {current: 0}, action) => {
	const stateCopy = {...state};
	switch (action.type) {
		case CHANGE_REGISTER_CURRENT:
			stateCopy.current = action.data;
			return stateCopy;
		default:
			return state;
	}
};

export default combineReducers({
	navBar,
	register
});