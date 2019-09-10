/**
 * 工具
 *
 * @time 2019/9/10
 */

/**
 * 过滤指定字符出现，出现两次后进行替换
 *
 * @param {*} character 替换的字符
 * @param {*} str 替换的文本
 * @return 过滤后的文本
 */
const filter =  (character, str) => {
	let characterIndex = str.indexOf(character);
	let strCopy = str;
	return strCopy.substring(0, characterIndex + 1) + strCopy.substring(characterIndex + 1).replace(/@/g, '');
};
/**
 * cookie 操作进行封装
 * 
 * @class Cookies
 */
class Cookies {
	/**
	 * 设置一个cookie
	 *
	 * @param {*} _key 键
	 * @param {*} _value 值
	 * @param {*} _time 销毁秒数
	 * @returns 插入的value
	 * @memberof Cookies
	 */
	set(_key, _value, _time) {
		if (_key === '')
			throw SyntaxError(`A string whose key cannot be empty`)
		const delTime = new Date(Math.floor(Date.now()) + _time * 1000);
		document.cookie = `${_key}=${_value}; expires=${delTime.toGMTString()}`;
		return _value;
	}
	/**
	 * 获取cookie key 对应的 value
	 *
	 * @param {*} _key
	 * @returns value
	 * @memberof Cookies
	 */
	get(_key) {
		const cookitArr = document.cookie.split('; ');
		for(let item = 0; item < cookitArr.length; item ++) {
			const itemArr = cookitArr[item].split("=");
			if (itemArr[0] === '') return undefined;
			if (itemArr[0] === _key) return itemArr[1];
		}
	}
}
export default {
	Cookies,
	filter
}