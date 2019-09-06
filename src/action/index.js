export const CHANGE_NAV_STATE = 'change_nav_state',
			 CHANGE_REGISTER = 'change_register',
			 CHANGE_REGISTER_CURRENT = 'change_register_current';

// action ---> 修改导航条状态
export const setNavState = (data) => ({ type: CHANGE_NAV_STATE, data });

// action ---> 修改注册内容
export const setRegister = (data) => ({ type: CHANGE_REGISTER, data });

// action ---> 修改注册进度
export const setRegisterCurrent = (data) => ({ type: CHANGE_REGISTER_CURRENT, data });