const env = process.env.NODE_ENV
console.log('运行环境', env)
// 小程序localhost 以及127.0.0都是不合法域名, 故需获取当前ipconfig,实时修改(cmd里输入ipconfig拿到ip替换192.168.5.207)
let baseURL = "http://192.168.5.207:8090/api" // 项目链接地址

if (env === 'development') {
	baseURL = "http://192.168.5.207:8090/api" // 开发链接地址
}

export default{
	baseURL,
}