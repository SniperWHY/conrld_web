// 发送验证码
const getCaptcha = (mail) => {
    return fetch(`/account/register/GetCaptcha?accountEmail=${mail}`).then(result => result.json())
}

export {
    getCaptcha,
}