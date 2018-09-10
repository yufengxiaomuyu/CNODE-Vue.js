// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import Router from './router'
import 'github-markdown-css'

Vue.prototype.$http = Axios
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.filter('formatTime',function(str) {
	if (!str ) return '';
	var time = new Date() - new Date(str);
	if (time < 0) {
		return '';
	} else if (time < 1000*60) {
		return '刚刚'	
	} else if (time < 1000*60*60) {
		var minutes = parseInt(time/(1000*60))
		return minutes + ' 分钟前'
	} else if (time < 1000*60*60*24) {
		var hours = parseInt(time/(1000*60*60))
		return hours + ' 小时前'
	} else if (time < 1000*60*60*24*30) {
		var days = parseInt(time/(1000*60*60*24))
		return days + ' 天前'
	} else if (time < 1000*60*60*24*30*12) {
		var months = parseInt(time/(1000*60*60*24*30))
		return months + ' 个月前'
	} else {
		var years = parseInt(time/(1000*60*60*24*30*12))
		return years + ' 年前'
	}
});
Vue.filter('formatTab',function(item) {
	if (item.top === true) {
		return '置顶';	
	} else if (item.good === true) {
		return '精华'
	} else if (item.tab === 'ask') {
		return '问答';	
	} else if (item.tab === 'share') {
		return '分享'
	} else if (item.tab === 'job') {
		return '招聘'
	};
});
new Vue({
  el: '#app',
  router: Router,      //vue实列中注入Router，属性名'router'不可更改
  template: '<App/>',
  components: {App},
})
