import React from 'react';
import { withRouter } from 'react-router-dom';
import * as Action from "../action";
import { connect } from 'react-redux';
import {
	Steps
} from 'antd';
import Slider from "../components/Slider";

import '../styles/register.scss';
class Register extends React.Component {
	render() {
		return (
			<div className='register'>
				<div className='nav'>
					<div className='logo'>
						LOGO 预留
					</div>
					<div className='title'>
						创建Conrld ID
					</div>
					<Slider className="track"/>
				</div>
				<div className='register_content'>
					<h1>填写您的Email</h1>
					<Steps>
						<Steps.Step>
						</Steps.Step>
						<Steps.Step>
						</Steps.Step>
						<Steps.Step>
						</Steps.Step>
					</Steps>
				</div>
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