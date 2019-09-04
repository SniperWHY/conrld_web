import React from 'react';
import { withRouter } from 'react-router-dom'

class BreakHome extends React.Component {

	componentDidMount() {
		this.props.history.push("/", {});
	}

	constructor (props) {
		super(props);
		this.state = {};
	}
	render() { return null; }
}

export default withRouter(BreakHome);