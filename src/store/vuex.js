import Vue from 'vue';
import Vuex from 'vuex';
import { Message } from 'element-ui';
import CONFIG from '../js/config';
import VueCookies from 'vue-cookies'

Vue.use(Vuex);

// 不建议线上使用
const debug = process.env.NODE_ENV !== 'production';

/**
 * export一个store的单例
 */
var cookie = JSON.parse(VueCookies.get(CONFIG.cookieKey));

export default new Vuex.Store({
	state: {
		isLogin: cookie ? cookie.isLogin : false ,
		user: {}
	},
	mutations: {
		setUser: function(state, payload) {
			state.user = payload;
		},
		setLogin: function(state, payload) {
			state.isLogin = payload;
		}
	},
	actions: {
		setUser: function(context, payload) {
			context.commit('setUser', payload);
		},
		setLogin: function(context, payload) {
			context.commit('setLogin', payload);
		}
		
	},
	getters: {
	    getUser(state) {
	    	return state.user;
	    },
	    getLogin(state) {
	    	return state.isLogin;
	    }
	}
});
