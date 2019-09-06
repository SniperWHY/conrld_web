import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Action from '../action';
import Editor from 'for-editor';
import EditorToolBarConfig from '../config/editorConfig';
import NavBar from "../components/NavBar";
import {  Input,
		  Button } from 'antd';
import '../styles/md_editor.scss';

class MdEditor extends React.Component {
	render () {
		return (
			<div className='editor'>
				<NavBar />
				<div className='toolbar'>
					<Input type='text' placeholder='编辑文章的标题...' maxLength={ 50 } value={ this.state.articleTitle } onChange={ this.handelChangeArticleTitle } />
					<p className='input_tips'>{ this.state.articleTitle.length }/50</p>
					<Button type='primary' icon='arrow-up'>发布文章</Button>
				</div>
				<div className='markdown_edit'>
					<Editor
						placeholder='编辑文章...'
						value={ this.state.article }
						onChange={ this.handelChangeArticle }
						toolbar={ EditorToolBarConfig }
						preview={ true }
						expand={ true }
						subfield={ true }
					/>
				</div>
			</div>
		)
	}
	// 文章内容 input changed
	handelChangeArticle = value => {
		this.setState({article: value});
	};

	// 文章标题 input changed
	handelChangeArticleTitle = event => {
		this.setState({articleTitle: event.target.value});
	};

	constructor (props) {
		super(props);
		this.state = {
			article: '',
			articleTitle: ''
		};
	}

	componentDidMount() {
		this.props.setNavState("markdownEdit");
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
)(withRouter(MdEditor));
