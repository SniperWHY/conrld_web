/*
* 工具
* */

// 去除字符串中超过2次的字
const filter =  (character, str) => {
	let characterIndex = str.indexOf(character);
	let strCopy = str;
	return strCopy.substring(0, characterIndex + 1) + strCopy.substring(characterIndex + 1).replace(/@/g, '');
};
export default {
	filter
}