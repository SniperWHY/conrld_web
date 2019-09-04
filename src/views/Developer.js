import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Action from "../action";
import NavBar from "../components/NavBar";

import '../styles/developer.scss';

class Developer extends React.Component {
	render () {
		return (
			<div className='developer'>
				<NavBar />
				开发者
			</div>
		)
	}

	constructor (props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.setNavState("developer");
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
)(withRouter(Developer));