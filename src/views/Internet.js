import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Action from "../action";
import NavBar from "../components/NavBar";

import '../styles/internet.scss'

class Internet extends React.Component {
	render () {
		return (
			<div className='internet'>
				<NavBar />
				互联网
			</div>
		)
	}

	constructor (props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.setNavState("internet");
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
)(withRouter(Internet));