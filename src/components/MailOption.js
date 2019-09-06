import React from 'react';
import { MailConfigTips } from '../config/Mail';
import {
	Select,
	Icon
} from 'antd';
const { Option } = Select;

const MailOption = (props) => {
	return(
		<Select defaultValue={ props.defaultValue } value={ props.value } style={{ width: 130 }} onSelect={ props.onSelect }>
			{
				MailConfigTips.map((item) => {
					if (item.mail === '')
						return (<Option key={ item.key } value={ item.mail }> <Icon theme="filled" type={ item.icon } />&nbsp;自定义</Option>)
					return (<Option key={ item.key } value={ '@' + item.mail }> <Icon theme={ item.is ? 'filled' : '' } type={ item.icon } />&nbsp;{ '@' + item.mail }</Option>)
				})
			}
		</Select>
	)
};

export default MailOption;