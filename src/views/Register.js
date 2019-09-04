import React from 'react';
import { withRouter } from 'react-router-dom';
import * as Action from "../action";
import { connect } from 'react-redux';

import '../styles/register.scss';

class Register extends React.Component {
	render() {
		return (
			<div className='register'>
				
			</div>
		)
	}

	componentDidMount() {
		this.props.setNavState("register");
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
)(withRouter(Register));