import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RouterView from "./router/RouterView";

import './styles/app.scss';

class App extends Component {

	constructor (props) {
		super(props);
		this.state = {};
	}

	render () {
		return (
			<RouterView />
		)
	}
}

export default withRouter(App);
