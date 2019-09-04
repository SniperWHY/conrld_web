import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
	Menu,
	Button
} from 'antd';
import * as Action from '../action';
import { connect } from 'react-redux';

import '../styles/navbar.scss';

class NavBar extends React.Component {
	render () {
		return (
			<nav className='nav_bar'>
				<div className='conrld_logo'>logo</div>
				<Menu className='nav_menu' onClick={ this.handleMenuClick } mode="horizontal" selectedKeys={ [this.props.navState] }>
					<Menu.Item key='home' >
						首页
					</Menu.Item>
					<Menu.Item key='science' >
						科技
					</Menu.Item>
					<Menu.Item key='forum' >
						论坛
					</Menu.Item>
					<Menu.Item key='internet' >
						互联网
					</Menu.Item>
					<Menu.Item key='developer' >
						开发者
					</Menu.Item>
					<Menu.Item key='about' >
					`	关于
					</Menu.Item>
				</Menu>
				<div className='nav_link'>
					<Link to='/register'>注册</Link>
					<Link to='/login'>登录</Link>
					<Button className='write' type='primary' shape="round" icon='edit'>写文章</Button>
				</div>
			</nav>
		)
	}

	handleMenuClick = event => {
		if (event.key !== this.props.navState)
			this.props.history.push(`/${event.key}`);
	};

	constructor (props) {
		super(props);
		this.state = {}
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
)(withRouter(NavBar));