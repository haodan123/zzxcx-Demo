import App from './App'
import '@/network/request.js'

	 const QQMapWX = require('/utils/qqmap-wx-jssdk.min.js');
	 uni.$QQMapWX = QQMapWX

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import pinia from "@/stores/index"
// uni.$safeTop = uni.getSystemInfoSync().safeAreaInsets.top
// uni.$safeBtm = uni.getSystemInfoSync().safeAreaInsets.bottom
export function createApp() {
	const app = createSSRApp(App)
	app.use(pinia);
	return {
		app,
		pinia
	}
}
// #endif