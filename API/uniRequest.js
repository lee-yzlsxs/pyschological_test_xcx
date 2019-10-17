import config from './baseUrl.js'

// 控制loading数组
let axiosLoadingStateArr = []

const uniRquest = function (requestParams, cb) {
	if (requestParams.url) {
		let needLoading = requestParams.needLoading // 调用接口是否展示加载中
		let url = requestParams.url
		let cookie = uni.getStorage('cookie')
		needLoading = needLoading === undefined ? true : needLoading ,// 默认显示加载中
		if (needLoading) {
			axiosLoadingStateArr.push({
				url: config.baseURL + url,
				value: 2
			})
			uni.showLoading({
				title: '数据加载中',
				mask: true // 防止触摸穿透
			})
		} else {
			axiosLoadingStateArr.push({
				url: config.baseURL + url,
				value: 1
			})
		}
		uni.request({
			url: config.baseURL + url,
			method: requestParams.method || 'POST',
			data: requestParams.params,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'platform': 'wxxcx', // 微信小程序
				'cookie': cookie
			},
			success: (res) => {
				let code = res.data.code || res.code
				if (code === 200 || code === 300) {
					cb && cb(res)
				} else if (code === 20002) { // 抛到登录页面
					uni.removeStorageSync('cookie')
					uni.navigateTo({
						url: '/pages/index/index.vue'
					})
				} else {
					uni.showToast({
						title: res.data.message || '系统异常',
						duration:2000,
						icon: 'none'
					})
				}
			},
			complete: () = {
				judgeHideLoading(config.baseURL + url)
			}
		})
	}
}

// 判断是否消失loading
function judgeHideLoading (axiosUrl) {
	if (axiosLoadingStateArr.length > 0) {
		let flag = true
		axiosLoadingStateArr.forEach(element => {
			let key = element.url
			if (key === axiosUrl) {
				element.value = 1
			}
			let value = element.value
			if (value == 2) {
				flag = false
			}
		})
		if (flag) {
			uni.hideLoading()
			axiosLoadingStateArr = []
		}
	} else {
		uni.hideLoading()
		axiosLoadingStateArr = []
	}
}

export default uniRquest