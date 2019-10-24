# pyschological_test_xcx
心理测试小程序
## 1,2,11点注意一下
## 1.小程序不支持localhost以及127.0.0之类的域名, 需要你实时将你的ip替换掉(在psychological_test_xcx/API/baseUrl.js里改)
## 2.端口是你Python项目设置的端口号,不要设置8080,8000,可以设置8090之类的,不然容易被占用,如果出现端口占用的情况,在cmd里关闭其他占用的进程(怎么关闭进程问度娘)
## 3.API文件是配置接口路径的,以及封装了接口调用的方法(uniRequest.js文件), apis文件夹下面的js文件是项目需要用到的接口, api.js文件是导出接口, baseUrl是配置路径前面相同部分的
## 4.js_sdk是项目安装的插件, (echarts)
## 5.libs(库) 项目需要用的数据, 包含首页介绍disc的数据, 以及前端没调接口之前模拟测试用的假数据等等
## 6.utils是封装的项目常用的方法(打乱顺序, 分组等)
## pages是项目的页面
## 8.static是一些共用的css样式之类的静态文件
## 9.unpackage是项目打包文件,打包工具自己生成的,不用管它,它是为了在微信开发者工具上运行起来
## 10.关注一下utils封装的方法怎么实现的, 以及export的用法(当前文件里的数据或方法导出给其他页面或组件使用,用的都是export)
## 11.小程序不支持直接引入图片(需要放在服务器上, 没有服务器只能用base64), 要换首页图片的话,先把图片转成base64的格式(http://imgbase64.duoshitong.com/),再放在image标签里(https://blog.csdn.net/kukudehui/article/details/80409522)