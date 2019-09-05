import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
	Menu,
	Button,
	Icon
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
						<Icon type="home" />
						首页
					</Menu.Item>
					<Menu.Item key='science' >
						<Icon type="setting" theme="filled" />
						科技
					</Menu.Item>
					<Menu.Item key='forum' >
						<Icon type="usergroup-delete" />
						论坛
					</Menu.Item>
					<Menu.Item key='internet' >
						<Icon type="global" />
						互联网
					</Menu.Item>
					<Menu.Item key='developer' >
						<Icon type="code" theme="filled" />
						开发者
					</Menu.Item>
					<Menu.Item key='about' >
						<Icon type="info-circle" />
						关于
					</Menu.Item>
				</Menu>
				<div className='nav_link'>
					<Link to='/register'>注册</Link>
					<Link to='/login'>登录</Link>
					{
						this.props.navState !== "markdownEdit" ? (
							<Button className='write' type='primary' onClick={ this.editMd } shape="round" icon='edit'>写文章</Button>
						) : null
					}
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
	editMd = () => {
		// 后续加入判断是否进入编辑界面
		this.props.history.push('/mdEdit', {});
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