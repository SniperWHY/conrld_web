import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Action from "../action";
import NavBar from "../components/NavBar";

import '../styles/about.scss'

class About extends React.Component {
	render () {
		return (
			<div className='about'>
				<NavBar />
				关于
			</div>
		)
	}

	constructor (props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.setNavState("about");
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
)(withRouter(About));