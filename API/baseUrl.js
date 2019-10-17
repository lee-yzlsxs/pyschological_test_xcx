const env = process.env.NODE_ENV
console.log('运行环境', env)

let baseURL = "http://localhost:8080" // 项目链接地址
let socketDomain = 'wss://xcx.yymf.vip/socket'

if (env === 'development') {
	baseURL = "http://localhost:8080" // 开发链接地址
	socketDomain = "http://localhost:8080"
}

export default{
	baseURL,
	socketDomain
}