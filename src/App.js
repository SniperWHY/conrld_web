import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Store } from "./store";
import './style/app.scss';


class App extends Component {

	constructor (props) {
		super(props);
		this.state = Store.getState();
		Store.subscribe(this.storeChange);
	}

	storeChange () {
		this.setState(Store.getState());
	}

	render () {
		return (
			<div className='app'>
				asdasd
			</div>
		)
	}
}

export default withRouter(App);
