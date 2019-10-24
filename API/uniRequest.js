import config from "./baseUrl.js";

//控制loading的数组
let axiosLoadingStateArr = [];

const uniRquest = function(requestParams, cb) {
	if (requestParams.url) {
		let needLoading = requestParams.needLoading;
		let url = requestParams.url;
		let cookie = uni.getStorageSync('cookie');
		//是否出现loading
		needLoading = needLoading == undefined ? true : needLoading;
		if (needLoading) {
			axiosLoadingStateArr.push({
				url: config.baseURL + url, // 组合请求地址
				value: 2
			});
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
		} else {
			axiosLoadingStateArr.push({
				url: config.baseURL + url,
				value: 1
			});
		}
		uni.request({
			url: config.baseURL + url,
			method: requestParams.method || "POST",
			data: requestParams.params,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'platform': 'wxxcx', // 微信小程序
				'cookie': cookie
			},
			success: (res) => {
				let code = res.statusCode || res.code;
				if (code == 200 || code == 300) {
					cb && cb(res);
				} else {
					uni.showToast({
						title:res.data.message || "系统异常，请稍后再试",
						duration:2000,
						icon:"none"
					})
				}
				
			},
			complete: () => {
				judgeHideLoading(config.baseURL + url);
			}
		});
	}
}


//判断是否消失loading
function judgeHideLoading(axiosUrl) {
    if (axiosLoadingStateArr.length > 0) {
        let flag = true;
        axiosLoadingStateArr.forEach(function (obj) {
            let key = obj.url;
            if (key == axiosUrl) {
                obj.value = 1;
            }
            let value = obj.value;
            if (value == 2) {
                flag = false;
            }
        });
        if (flag) {
            uni.hideLoading();
            axiosLoadingStateArr = [];
        }
    } else {
        uni.hideLoading();
        axiosLoadingStateArr = [];
    }
}

export default uniRquest