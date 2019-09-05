import React from 'react';
import {
	withRouter,
	Switch,
	Route } from 'react-router-dom';
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import BreakHome from "../components/BreakHome";
import Science from "../views/Science";
import Forum from "../views/Forum";
import Internet from "../views/Internet";
import Developer from "../views/Developer";
import About from "../views/About";
import MdEdit from "../views/MdEdit";

class RouterView extends React.Component {
	render() {
		return (
			<Switch>science
				<Route exact path='/' component={ () => <Home /> } />
				<Route exact path='/science' component={ () => <Science /> } />
				<Route exact path='/forum' component={ () => <Forum /> } />
				<Route exact path='/internet' component={ () => <Internet /> } />
				<Route exact path='/developer' component={ () => <Developer /> } />
				<Route exact path='/about' component={ () => <About /> } />
				<Route exact path='/login' component={ () => <Login /> } />
				<Route exact path='/register' component={ () => <Register /> } />
				<Route exact path='/mdEdit' component={ () => <MdEdit /> } />
				<Route path='/*' component={ () => <BreakHome /> } />
			</Switch>
		)
	}
	constructor (props) {
		super(props);
		this.state = {};
	}
}

export default withRouter(RouterView);