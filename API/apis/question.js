import uniRquest from '../uniRequest.js';
import baseURL from "../baseUrl.js";

let api = {
	// 获取 测试题目
	getQuestions (params, cb) {
		uniRquest({
			params: params,
			url: '/work/searchAll/',
			needLoading: true
		},cb)
	},
}
export default api;