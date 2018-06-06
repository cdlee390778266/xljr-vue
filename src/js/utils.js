import axios from 'axios'
import CONFIG from './config'
import { Loading, Message, MessageBox } from 'element-ui';
import store from '../store/vuex'

var Utils = {}

Utils.$http = axios;

Utils.$store = store;

/**
 * Gets the tip text 获取提示文字
 *
 * @param      {<string>}  type    提示类型
 * @param      {<string>}  code    提示代码
 * @return     {<string>}  提示文字
 */
Utils.getTipText = function(type , code) {
	if(!type || !code) return;
	return CONFIG[type][code] || '';
}

/**
 * Shows the tip. 显示提示
 *
 * @param      {<string>}  type    	   提示框类型
 * @param      {<string>}  textType    提示文字类型
 * @param      {<string>}  code        提示代码
 */
Utils.showTip = function(type, textType, code) {
	Message({
      showClose: true,
      message: Utils.getTipText(textType, code),
      type: type ? type: 'success'
    })
}

/**
 * Hides the tip. 关闭提示框
 */
Utils.hideTip = function() {
	Message.close();
}

/**
 * Shows the modal dialog.	弹出框
 *
 * @param      {<type>}  type      弹出框类型
 * @param      {<type>}  textType  弹出文字类型
 * @param      {<type>}  code      弹出文字代码
 */
// Utils.showModalDialog = function(type, textType, code) {
// 	MessageBox.alert(Utils.getTipText(textType, code), '提示', {
//     	confirmButtonText: '确定',
//     	type: type ? type: 'success'
//     })
// }

/**
 * Gets the json. 获取json数据
 *
 * @param      {<type>}    url      url
 * @param      {Function}  success  成功回调
 * @param      {Function}  error    失败回调
 * @param      {string}    params   参数
 */
Utils.getJson = function(url, success, error, params = {}) {
	if(!url) return;
	var loadingInstance = Loading.service({
		fullscreen: true,
		spinner: 'fa fa-refresh fa-spin fa-3x fa-fw ql-loading',
		customClass: 'loading page-loading'
	});
	Utils.$http.get(url, {params: params})
		.then(function(res){
			loadingInstance.close();
            if(typeof success == 'function') success(res)
        })
        .catch(function(err){
        	loadingInstance.close();
        	Utils.showTip('error', 'error', '-1');
            if(typeof error == 'function') error(err)
        })
}

/**
 * Sets the user.设置登录用户
 *
 * @param      {<type>}  user    The user
 */
Utils.setUser = function(user) {
	store.dispatch('setUser', Object.assign({}, user))
}

/**
 * Gets the user.获取登录用户信息
 *
 * @return     {<type>}  The user.
 */
Utils.getUser = function() {
	return store.getters.getUser;
}

/**
 * Sets the login.设置是否登录
 *
 * @param      {boolean}  isLogin  Indicates if login
 */
Utils.setLogin = function(isLogin) {
	store.dispatch('setLogin', isLogin)
}

/**
 * Gets the login.获取是否登录
 *
 * @return     {<type>}  The login.
 */
Utils.getLogin = function() {
	return store.getters.getLogin;
}

export default Utils