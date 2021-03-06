import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Action from "../action";
import NavBar from "../components/NavBar";

import '../styles/science.scss'

class Science extends React.Component {
	render () {
		return (
			<div className='science'>
				<NavBar />
				科技
			</div>
		)
	}

	constructor (props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.setNavState("science");
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
)(withRouter(Science));