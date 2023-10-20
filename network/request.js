import {
	apiUrl
} from '@/config/global-config.js'

const $request = (url, data, method = 'POST', headers = "application/json;") => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中',
			icon: 'loading',
			mask: true
		});
		uni.request({
			// url: 'http://192.168.0.101:9096'+url,
			url: apiUrl + url,
			method,
			data: data,
			header: {
				'Content-Type': headers
			},
			success({
				data
			}) {
				// console.log(apiUrl,'环境',process.env.NODE_ENV);
				if (data.code !== 500) {

					resolve(data)
				} else {
					// 其他错误 -> 根据后端错误信息轻提示
					uni.showToast({
						icon: 'none',
						title: data.msg || '请求错误',
					})
					reject(data)
				}
			},
			fail(error) {
				uni.showToast({
					icon: 'none',
					title: '网络错误，换个网络试试',
				})
				reject(error);
				uni.hideLoading(); //关闭loading
			},
			complete() {
				uni.hideLoading(); //关闭loading
			}
		})
	})
}
//get请求
export const $get = (url, data) => {
	return $request(url, data, 'GET')
}
//post请求
export const $post = (url, data) => {
	return $request(url, data, 'POST')
}

uni.$post = $post
uni.$get = $get
