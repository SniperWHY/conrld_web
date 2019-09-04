import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Action from "../action";
import NavBar from "../components/NavBar";

import '../styles/forum.scss';

class Forum extends React.Component {
	render () {
		return (
			<div className='forum'>
				<NavBar />
				论坛
			</div>
		)
	}

	constructor (props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.setNavState("forum");
	}
}

export default connect(
	({navBar}) => {
		return {
			navState: navBar,
		}
	},
	(dispatch) => {
		return {
			setNavState: data => {dispatch(Action.setNavState(data))}
		}
	}
)(withRouter(Forum));