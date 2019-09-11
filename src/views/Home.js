import React from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/home.scss';
import NavBar from "../components/NavBar";
import { connect } from 'react-redux';
import * as Action from '../action'

class Home extends React.Component {
	render() {
		return (
			<div className='home'>
				<NavBar />
				主页
			</div>
		)
	}
	componentDidMount() {
		this.props.setNavState("home");
	}

	constructor (props) {
		super(props);
		this.state = {data:['张三', '李四']};
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
)(withRouter(Home));