import React from 'react';
import { withRouter } from 'react-router-dom';
import * as Action from "../action";
import { connect } from 'react-redux';
import { Steps,
		 Icon,
		 Input,
		 Tooltip,
		 Button } from 'antd';
import MailOption from '../components/MailOption';
import Slider from "../components/Slider";
import Util from '../tools';
import '../styles/register.scss';

const { Password } = Input;

class Register extends React.Component {
	prevMail = '@qq.com';
	render() {
		return (
			<div className='register'>
				<div className='nav' onMouseLeave={ this.handleNavBarMouseLeave } onMouseEnter={ this.handleNavBarMouseEnter } onClick={ this.handleNavBarClickBreakHome }>
					<div className='logo'>
						Conrld_Logo
					</div>
					<div className='title'>
						<p className='title_head'>创建Conrld ID</p>
						<p className='title_tips'>点击返回主页</p>
					</div>
					<Slider className="track"/>
				</div>
				<div className='register_content' ref={ registerContent => this.registerContent = registerContent }>
					<h1>验证邮箱</h1>
					<Steps current={ this.props.register.current }>
						<Steps.Step title='验证Email' icon={ <Icon type='mail' /> }/>
						<Steps.Step title='填写资料' icon={ <Icon type="form" /> }/>
						<Steps.Step title='注册完成' icon={ <Icon type="check-circle" /> }/>
					</Steps>
					<div className='register_step'>
						{
							this.props.register.current === 0 ? (
								<div className='v_mail'>
									<Tooltip
										trigger={['focus']}
										title={ "邮箱且长度保持在5-20(不包括邮箱域名)" }
										placement="topLeft"
										overlayClassName="numeric-input">
										<Input
											ref={ mailInput => this.mailInput = mailInput }
											type='text'
											onFocus={ this.handleMailInputFocus }
											onBlur={ this.handleMailInputBlur }
											placeholder='邮箱...'
											maxLength={ 20 }
											prefix={ <Icon type='mail' style={ this.state.mailInputIsIn ? { color: 'rgb(24, 144, 255)' } : { color: 'rgba(0, 0, 0, .25)' }} /> }
										size='large'
										addonAfter={ <MailOption defaultValue={ '@qq.com' } value={ this.state.option } onSelect={ this.handleMailInputSelectChange }/> }
										value={ this.state.mail }
										onChange={ this.handleMailChange }
										/>
									</Tooltip>
									<div className='register_v_p'>
										<Tooltip
											trigger={['focus']}
											title={ "输入密码,长度保持在8-15位" }
											placement="topLeft"
											overlayClassName="numeric-input">
											<Password
												type='password'
												placeholder='密码...'
												onFocus={ this.handlePasswordInputFocus }
												onBlur={ this.handlePasswordInputBlur }
												prefix={ <Icon type="key" style={ this.state.passwordInputIsIn ? { color: 'rgb(24, 144, 255)' } : { color: 'rgba(0, 0, 0, .25)' }} /> }
												size='large'
												maxLength={ 20 }
												visibilityToggle={ true }
												style={{ marginRight: '20px' }} />
										</Tooltip>
										<div className='send_vcode_group'>
											<Tooltip
												trigger={['focus']}
												title={ "验证码为六位数字" }
												placement="topLeft"
												overlayClassName="numeric-input">
												<Input
													type='text'
													placeholder='验证码'
													size='large'
													value={ this.state.verificationCode }
													onChange={ this.handleVerificationCodeInput }
													maxLength={ 6 }
													className='register_vcode' />
											</Tooltip>
											<Button
												icon="redo"
												type='primary'
												size='large'
												className='register_send_vcode'>发送验证码</Button>
										</div>
									</div>
									<Button className='to_next' size='large' type='primary' onClick={ this.handleToNextClick }>下一步</Button>
								</div>
							) : (
								this.props.register.current === 1 ? (
									<div className='edit_register_info'>
										填写信息
									</div>
								) : (
									this.props.register.current === 2 ? (
										<div className='register_ok'>
											注册完成
										</div>
									) : Error("current exception")
								)
							)
						}
					</div>
				</div>
				<div className='mask' ref={ mask => this.mask = mask } />
			</div>
		)
	}
	componentWillMount() {
		this.props.setNavState("register");
	}
	componentDidMount() {
	}
	constructor (props) {
		super(props);
		this.state = {
			mail:'',
			option: '@qq.com',
			verificationCode: '',
			mailInputIsIn: false,
			passwordInputIsIn: false
		};
	}
	// 完成邮箱验证
	handleToNextClick = () => {
		this.props.setRegisterCurrent(1);
	};
	handleMailInputFocus = () => {
		this.setState({ mailInputIsIn: true });
	};
	handleMailInputBlur = () => {
		this.setState({ mailInputIsIn: false });
	};
	handlePasswordInputFocus = () => {
		this.setState({ passwordInputIsIn: true });
	};
	handlePasswordInputBlur = () => {
		this.setState({ passwordInputIsIn: false });
	};
	handleVerificationCodeInput = event => {
		this.setState({
			verificationCode: event.target.value.replace(/[^0-9]/img, '')
		})
	};
	handleMailChange = event => {
		this.setState({
			mail: Util.filter('@', event.target.value.replace(/[^0-9a-zA-Z_@.]/img, '')),
		}, () => {
			if (this.state.mail.indexOf('@') !== -1)
				this.setState({ option: '' });
			else
				this.setState({ option: this.prevMail });
		});
	};
	handleMailInputSelectChange = (option) => {
		if (this.state.mail.indexOf('@') !== -1)
			this.setState({ mail: this.state.mail.substring(0, this.state.mail.indexOf('@')) });
		this.setState({
			option,
		}, () => { this.prevMail = option; })
	};
	handleNavBarClickBreakHome = () => {
		this.props.history.push('/');
	};
	handleNavBarMouseEnter = () => {
		this.timer = new Date().getTime();
		this.mask.style = 'z-index:800;background:rgba(110, 110, 110, .6);';
		this.registerContent.style = "z-index:-1;box-shadow: 0 3px 10px #BBBBBB;opacity:.5";
	};
	handleNavBarMouseLeave = () => {
		console.log(new Date().getTime() - this.timer);
		this.mask.style = "";
		window.setTimeout(() => {
			this.registerContent.style = "";
		}, (new Date().getTime() - this.timer) > 700 ? 700 : new Date().getTime() - this.timer);
	};
}
export default connect(
	({ navBar, register }) => {
		return {
			navState: navBar,
			register: register
		}
	},
	(dispatch) => {
		return {
			setNavState: data => { dispatch(Action.setNavState(data)) },
			setRegisterCurrent: data => { dispatch(Action.setRegisterCurrent(data)) }
		}
	}
)(withRouter(Register));