import React from 'react';
import {
	withRouter,
	Prompt
} from 'react-router-dom';
import * as Action from "../action";
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import {
	Steps,
	Icon,
	Input,
	Tooltip,
	message,
	Button
} from 'antd';
import MailOption from '../components/MailOption';
import TweenOne from 'rc-tween-one';
import Slider from "../components/Slider";
import Util from '../tools';
import {
	getEnter,
	getEnter_Title,
	getInterval_Title,
	componentProps_Title
} from "../config/FontAnimation";

import '../styles/register.scss';

const Cookie = new Util.Cookies();
const { Password } = Input;

class Register extends React.Component {
	prevMail = '@qq.com';
	sendVCodeCount = 0;
	render() {
		console.log(this.props);
		return (
			<div className='register'>
				<Prompt message={this.handleOnLeave} />
				<div className='nav'>
					<div className='logo'>
						Conrld_Logo
					</div>
					<div className='title'>
						<div className='title_head'>
							<Texty
								delay={ 400 }
								enter={ getEnter_Title }
								interval={ getInterval_Title }
								component={ TweenOne }
								componentProps={ componentProps_Title }
							>创建Conrld ID</Texty>
						</div>
					</div>
					<Slider className="track" />
					<p className='title_tips'><span onClick={this.handleNavBarClickBreakHome}>点击此处返回</span></p>
				</div>
				<div className='register_content' ref={registerContent => this.registerContent = registerContent}>
					<h1 className='header'>
						<div className='text_box' style={this.props.register.current === 0 ? { opacity: '1' } : {}}><Texty delay={ 200 } duration={600} enter={getEnter} interval={1}>{this.props.register.current === 0 ? '验证邮箱' : ""}</Texty></div>
						<div className='text_box' style={this.props.register.current === 1 ? { opacity: '1' } : {}}><Texty delay={ 200 } duration={600} enter={getEnter} interval={1}>{this.props.register.current === 1 ? '编辑资料' : ""}</Texty></div>
						<div className='text_box' style={this.props.register.current === 2 ? { opacity: '1' } : {}}><Texty delay={ 200 } duration={600} enter={getEnter} interval={1}>{this.props.register.current === 2 ? '完成创建' : ""}</Texty></div>
					</h1>
					<Steps current={this.props.register.current} status={this.state.stepStatus}>
						<Steps.Step title={this.props.register.current !== 0 ? '已验证' : '验证邮箱'} icon={this.props.register.current !== 0 ? <Icon type='check-circle' style={{ color: 'green' }} /> : <Icon type='mail' />} />
						<Steps.Step title={this.props.register.current === 2 ? '已验证' : '填写资料'} icon={this.props.register.current === 2 ? <Icon type='check-circle' style={{ color: 'green' }} /> : <Icon type="form" />} />
						<Steps.Step title='注册完成' icon={(this.state.stepStatus === 'finish' && this.props.register.current === 2) ? <Icon type="check-circle" style={{ color: 'green' }} /> : <Icon type="check-circle" />} />
					</Steps>
					<div className='register_step'>
						<QueueAnim delay={ 200 } className='animate_context' animConfig={
							[
								{ opacity: [1, 0], translateY: [0, 50] },
								{ opacity: [1, 0], translateY: [0, -50] }
							]
						} style={
							this.props.register.current === 0 ? { height: `${this.state.VMailElHeight}px` } : (
								this.props.register.current === 1 ?
									{ height: `${this.state.editRegisterInfoElHeight}px` }
									: { height: `${this.state.registerFinishElHeight}px` }
							)
						}>
							{
								this.props.register.current === 0 ? (
									<div className='v_mail' ref={ref => this.VMailEl = ref} key={'current_1'}>
										<Tooltip
											trigger={['focus']}
											title={"邮箱且长度保持在5-20(不包括邮箱域名)"}
											placement="topLeft"
											overlayClassName="numeric-input">
											<Input
												ref={mailInput => this.mailInput = mailInput}
												type='text'
												onFocus={this.handleMailInputFocus}
												onBlur={this.handleMailInputBlur}
												placeholder='邮箱...'
												maxLength={20}
												prefix={<Icon type='mail' style={this.state.mailInputIsIn ? { color: 'rgb(24, 144, 255)' } : { color: 'rgba(0, 0, 0, .25)' }} />}
												size='large'
												addonAfter={<MailOption defaultValue={'@qq.com'} value={this.state.option} onSelect={this.handleMailInputSelectChange} />}
												value={this.state.mail}
												onChange={this.handleMailInputChange}
											/>
										</Tooltip>
										<div className='register_v_p'>
											<Tooltip
												trigger={['focus']}
												title={"密码(不允许出现特殊字符),长度保持在8-15位"}
												placement="topLeft"
												overlayClassName="numeric-input">
												<Password
													type='password'
													placeholder='密码...'
													onFocus={this.handlePasswordInputFocus}
													onBlur={this.handlePasswordInputBlur}
													prefix={<Icon type="key" style={this.state.passwordInputIsIn ? { color: 'rgb(24, 144, 255)' } : { color: 'rgba(0, 0, 0, .25)' }} />}
													onChange={this.handlePasswordInputChanged}
													size='large'
													maxLength={20}
													visibilityToggle={true}
													value={this.state.password}
													style={{ marginRight: '20px' }} />
											</Tooltip>
											<div className='send_vcode_group'>
												<Tooltip
													trigger={['focus']}
													title={"验证码为六位数字"}
													placement="topLeft"
													overlayClassName="numeric-input">
													<Input
														type='text'
														placeholder='验证码'
														size='large'
														value={this.state.verificationCode}
														onChange={this.handleVerificationCodeInputChanged}
														maxLength={6}
														className='register_vcode' />
												</Tooltip>
												<Button
													type='primary'
													size='large'
													disabled={this.state.isSendVCode}
													onClick={this.handleSendVerificationCode}
													className='register_send_vcode'>{this.state.isSendVCode ? `重新发送(${
														(this.state.sendVCodeTime + "").length === 1 ? "0" + this.state.sendVCodeTime : this.state.sendVCodeTime
														})` : '发送验证码'}</Button>
											</div>
										</div>
										<Button className='to_next' size='large' type='primary' onClick={this.handleToNextClick}>下一步</Button>
									</div>
								) : (this.props.register.current === 1 ? (
									<div className='edit_register_info' ref={ref => this.editRegisterInfoEl = ref} key={'current_2'}>
										<Input type='text' />
										<Button className='register_submit' onClick={this.finishRegister} type='primary'>提交</Button>
									</div>
								) : (
										<div className='register_finish' ref={ref => this.registerFinishEl = ref} key={'current_3'}>
											注册完成
									</div>
									))
							}
						</QueueAnim>
					</div>
				</div>
			</div>
		)
	}

	constructor(props) {
		super(props);
		this.state = {
			// 邮箱value
			mail: '',
			// 密码value
			password: '',
			// 邮箱域名后缀 自定义邮箱时为空串
			option: '@qq.com',
			// 验证码value
			verificationCode: '',
			// 邮箱Input获取焦点？
			mailInputIsIn: false,
			// 密码Input获取焦点？
			passwordInputIsIn: false,
			// 可以发送验证码？
			isSendVCode: false,
			// 下次验证码倒计时
			sendVCodeTime: 0,
			// 邮箱验证通过？
			isInputInfo: false,
			// 注册步骤状态
			stepStatus: 'process',
			// 验证邮箱容器高度
			VMailElHeight: 160,
			// 编辑资料容器高度
			editRegisterInfoElHeight: 130,
			// 注册完成容器高度
			registerFinishElHeight: 30
		};
	}
	componentWillMount() {
		// 拦截判断是否离开当前页面
		// window.addEventListener('beforeunload', this.beforeunload);
	}
	componentWillUnmount() {
		this.props.setRegisterCurrent(0);
		// 销毁拦截判断是否离开当前页面
		// window.removeEventListener('beforeunload', this.beforeunload);
	}
	// beforeunload (e) {
	// 	let confirmationMessage = '你确定离开此页面吗?';
	// 	(e || window.event).returnValue = confirmationMessage;
	// 	return confirmationMessage;
	//   }
	componentDidMount() {
		const sendCount = Cookie.get("SEND_VCODE_COUNT");
		// 发送次数cookie 如果不存在就创建一个 
		if (sendCount !== undefined)
			this.sendVCodeCount = JSON.parse(sendCount).count;
		else // 如果存在就更新次数
			this.updateSendCount();
		if (Cookie.get("VCODE") !== undefined) {
			const time = Math.floor((parseInt(JSON.parse(Cookie.get("VCODE")).time) - Date.now()) / 1000);
			this.initSendVCodeTimer(time);
		} else {
			this.setState({
				isSendVCode: false
			});
		}
		// 注册进度还原
		this.props.setRegisterCurrent(0);
		// navBar状态设置为register
		this.props.setNavState("register");
	}
	// 更新发送验证码次数
	updateSendCount() {
		// 获取当前日期对象
		const nowDate = new Date();
		// 将当前日期调整到当日凌晨00:00:00 秒
		nowDate.setHours(0);
		nowDate.setMinutes(0);
		nowDate.setSeconds(0);
		// 获取从现在到明天的秒数
		const secondsTomorrow = Math.floor((86400000 - (Date.now() - nowDate.getTime())) / 1000)
		Cookie.set("SEND_VCODE_COUNT", JSON.stringify({
			count: this.sendVCodeCount,
		}), secondsTomorrow);
	}
	/**
	 * 验证码timer
	 * @param {*} _time 验证码秒数
	 */
	initSendVCodeTimer(_time) {
		this.setState({
			isSendVCode: true,
			sendVCodeTime: _time,
		}, () => {
			this.sendVCodeTimer = window.setInterval(() => {
				if (this.state.sendVCodeTime === 0) {
					this.setState({
						isSendVCode: false
					});
					window.clearInterval(this.sendVCodeTimer);
				} else {
					this.setState({
						sendVCodeTime: this.state.sendVCodeTime - 1,
					});
				}
			}, 1000);
		});
	}
	// 发送验证码 ==> 有请求
	handleSendVerificationCode = () => {
		// 合并邮箱前缀 和后缀  （注意自定义模式下 后缀为空串）
		const email = this.state.mail + this.state.option;
		console.log("提交的邮箱----->" + email);
		const sendTime = ++this.sendVCodeCount < 3 ? 60 : 120;
		this.updateSendCount()
		Cookie.set("VCODE", JSON.stringify({ time: Date.now() + sendTime * 1000 }), sendTime);
		this.initSendVCodeTimer(sendTime);
	};
	// 验证邮箱 ==> 有请求
	handleToNextClick = () => {
		message.success("验证成功");
		this.props.setRegisterCurrent(1);
	};
	// 提交个人资料完成注册 ==> 有请求
	finishRegister = () => {
		this.setState({
			stepStatus: 'finish'
		}, () => this.props.setRegisterCurrent(2));
	};
	// 以下四个方法均为邮箱与密码的表单的获取/失去焦点 
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
	// 邮箱InputChanged
	handleMailInputChange = event => {
		this.setState({
			mail: Util.filter('@', event.target.value.replace(/[^0-9a-zA-Z_@.]/img, '')),
		}, () => {
			if (this.state.mail.indexOf('@') !== -1)
				this.setState({ option: '' });
			else
				this.setState({ option: this.prevMail });
		});
	};
	// 密码Input Changed
	handlePasswordInputChanged = event => {
		this.setState({ password: event.target.value.replace(/[^0-9a-zA-Z.]/img, '') });
	}
	// 验证码Input Changed
	handleVerificationCodeInputChanged = event => {
		this.setState({
			verificationCode: event.target.value.replace(/[^0-9]/img, '')
		});
	};
	// 邮箱下拉菜单 Changed
	handleMailInputSelectChange = (option) => {
		if (this.state.mail.indexOf('@') !== -1)
			this.setState({ mail: this.state.mail.substring(0, this.state.mail.indexOf('@')) });
		this.setState({
			option,
		}, () => { this.prevMail = option; })
	};
	// 返回主页
	handleNavBarClickBreakHome = () => {
		this.props.history.push("/");
	};
	// 页面离开拦截
	handleOnLeave = () => {
		if (this.state.mail !== '' || this.state.password !== '' || this.state.verificationCode !== '')
			return window.confirm("如果现离开页面，你输入的数据将不会保存！你确定要离开页面？");
		return true;
	};
}
export default connect(
	// redux 属性 ==> props
	({ navBar, register }) => {
		return {
			navState: navBar,
			register: register
		}
	},
	// redux 操作 ==> props
	(dispatch) => {
		return {
			// 设置页面路由状态
			setNavState: data => { dispatch(Action.setNavState(data)) },
			// 设置注册进度 0： 验证邮箱 1： 设置个人资料 2： 注册结果反馈
			setRegisterCurrent: data => { dispatch(Action.setRegisterCurrent(data)) }
		}
	}
)(withRouter(Register));