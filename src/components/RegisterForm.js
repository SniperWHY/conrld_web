import React from 'react';
import {
    Form,
    Input,
    Button,
    Cascader,
    DatePicker,
    Select,
    Icon,
    Tooltip
} from 'antd';
import DomSize from 'wd-domsize-monitor';
import PortraitUpload from './PortraitUpload';
import City from '../config/City';
import '../styles/register_form.scss';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Option } = Select;
// 日期选择范围
const disabledDate = (current) => {
    return current < moment(new Date('1970/01/01')) || current > moment().endOf('day')
};

const { BMap, BMAP_STATUS_SUCCESS }  = window;
const { Map, Point, Geolocation } = BMap;
class RegistrationForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            gender: 2,
            address: [],
            birthday: moment(`${moment().year()}-${moment().month() + 1}-${moment().date()}`, 'YYYY-MM-DD'),
            github: '',
        };
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleSubmit();
            }
        });
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty)
            form.validateFields(['confirm'], { force: true });
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value)
            autoCompleteResult = [];
        else
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        this.setState({ autoCompleteResult });
    };
    componentDidMount() {
        let map = new Map("allmap");
        let point = new Point(116.331398,39.897445);
        map.centerAndZoom(point,12);
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r){
            if(this.getStatus() === BMAP_STATUS_SUCCESS){
                let mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                alert('您的位置：'+r.point.lng+','+r.point.lat);
            }
            else {
                alert('failed'+this.getStatus());
            }
        });
        DomSize.bind(this.form, () => {
            try{
                this.props.setHeight(this.form.offsetHeight);
            }catch (e) { }
        });
    }
    // 住址change
    handleCityChange = address => {
        this.setState({ address });
    };

    // 性别change
    handleGenderChanged = gender => {
        this.setState({gender});
    };

    // 生日change
    handleBirthdayChange = (...date) => {
        this.setState({
            birthday: date[0]
        })
    };

    // github change
    handleGithubChange = event => {
        this.setState({github: event.target.value.replace(/[^a-zA-Z0-9]/, '')});
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { github, birthday, address, gender } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div  ref={ ref => this.form = ref }>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className='register_form'>
                <h3>必要的信息(必填)</h3>
                <div style={{transform: 'translateX(-50px)'}}>
                <Form.Item label='姓名' hasFeedback>
                    {getFieldDecorator('nickname', {
                        rules: [
                            { required: true, message: '姓名不能为空', whitespace: true },
                            ],
                    })(<Input placeholder='输入姓名' maxLength={ 10 } />)}
                </Form.Item>
                <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                            {
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,18}$/g,
                                message: '密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-18之间'
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password maxLength={18} placeholder='输入密码' />)}
                </Form.Item>
                <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} maxLength={18} placeholder='确认密码'/>)}
                </Form.Item>
                </div>
                <h3>你的资料(选填)</h3>
                <div className='account_info_top'>
                    <div className='info_left'>
                        <div style={{marginBottom: "20px"}}>
                            <em>*</em> 生日：
                            <DatePicker placeholder='生日(选填)'
                                        disabledDate={ disabledDate }
                                        onChange={ this.handleBirthdayChange }
                                        value={ birthday }
                                        size='large' />
                        </div>
                        <div>
                            <em>*</em> 住址：<Cascader value={ address } style={{width: '250px'}} size='large' fieldNames={{ label: 'name', value: 'code', children: 'items' }} options={ City } onChange={ this.handleCityChange } placeholder='住址(选填)'/>
                        </div>
                    </div>
                    <div className='info_right'>
                        <PortraitUpload />
                    </div>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ flex: '1' }}>
                        <em>*</em> 性别：
                        <Select size='large' defaultValue={ 2 } style={{width: '100px'}} onChange={ this.handleGenderChanged } value={ gender }>
                            <Option size='large' value={ 0 }><Icon type='man' style={{color: 'blue'}} />&nbsp;男性</Option>
                            <Option size='large' value={ 1 }><Icon type='woman' style={{color: 'pink'}}/>&nbsp;女性</Option>
                            <Option size='large' value={ 2 }><Icon type="eye-invisible" />&nbsp;保密</Option>
                        </Select>
                    </div>
                    <div>
                        <Tooltip
                            trigger={['focus']}
                            title={`https://github.com/${ github }`}
                            placement="topLeft"
                            overlayClassName="numeric-input">
                        <Input type='text'
                               size='large'
                               prefix={ <Icon type='github' /> }
                               value={ this.state.github }
                               onChange={ this.handleGithubChange }
                               maxLength={ 15 }
                               placeholder='Github 名称(选填)' />
                        </Tooltip>
                    </div>
                </div>

                <Button size='large' htmlType='submit' type='primary' style={{width: '100%'}}>注册</Button>
                </Form>
            </div>
        );
    }
}
export default Form.create({ name: 'register' })(RegistrationForm);