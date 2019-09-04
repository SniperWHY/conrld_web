import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Action from "../action";

import '../styles/login.scss';

class Login extends React.Component {
	render() {
		return (
			<div className='login'>
				登录
			</div>
		)
	}

	componentDidMount() {
		this.props.setNavState("login");
	}

	constructor (props) {
		super(props);
		this.state = {};
	}
}

export default connect(
	({ navBar }) => ({
		navState: navBar
	}),
	(dispatch) => {
		return {
			setNavState: data => { dispatch(Action.setNavState(data)) }
		}
	}
)(withRouter(Login));