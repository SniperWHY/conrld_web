import { combineReducers } from 'redux';
import {
	CHANGE_NAV_STATE,
	CHANGE_REGISTER_CURRENT,
	CHANGE_REGISTER
} from '../action';

const navBar = (state = "", action) => {
	let copyState = state;
	if (action.type === CHANGE_NAV_STATE) {
		copyState = action.data;
		return copyState;
	}
	return state;
};

const register = (state = {current:0}, action) => {
	const stateCopy = Object.assign(state);
	switch (action.type) {
		case CHANGE_REGISTER:
			return action.data;
		case CHANGE_REGISTER_CURRENT:
			stateCopy.current = action.data;
			return stateCopy;
		default: return state;
	}
};

export default combineReducers({
	navBar,
	register
});