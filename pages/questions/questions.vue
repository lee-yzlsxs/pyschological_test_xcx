<template>
	<view class="container">
		<view class="question bold mglr changeColor">{{tests[selectIndex].question}}</view>
		<view class="answer-box mglr">
			<view class="answer-item"
			v-for="(item, index) in tests[selectIndex].anwsers"
			:key="index"
			@tap="selectItemAnswer(item)">{{item.content}}</view>
		</view>
		<view class="bottom">
			----<text class="index-info">第{{selectIndex + 1}}题 / 共{{len}}题</text>----
		</view>
	</view>
</template>

<script>
	import api from "@/API/api.js"
	export default {
		data () {
			return{
				version: '1',
				selectIndex: 0, // 当前第几个问题
				tests: [], // 问卷数据
				answers: [], // 用户的回答
				len: 0 // 总共多少个问题
			}
		},
		methods: {
			// 获得问卷数据
			getTests (len) {
				api.getQuestions({ size: len }, res => {
					let data = res.data || []
					data.forEach((element, index) => {
						element.anwsers = JSON.parse(element.anwsers)
					})
					data.forEach(element => {
						element.anwsers = this.$utils.shuffle(element.anwsers)
					})
					this.tests = this.$utils.shuffle(data)
					uni.hideLoading()
				})
				// 没连接口时,前端测试用
				// setTimeout(() => {
				// 	let param = JSON.parse(JSON.stringify(this.$dicts.getDictArr('testData')))
				// 	param = this.getLargeArr(param, this.len) // 模拟问卷数据
				// 	param.forEach(element => {
				// 		element.anwsers = this.$utils.shuffle(element.anwsers)
				// 	})
				// 	this.tests = param
				// 	uni.hideLoading()
				// }, 600)
			},
			// 获取指定长度的数据(用于没连接口前模拟问卷题目数据)
			getLargeArr (arr, len) {
				if (!arr.length) { return arr } // 列表为空, 不必执行
				arr = this.$utils.shuffle(arr) // 打乱顺序
				if (arr.length < len) { // 数据不够, 将给定的arr列表concat它自己
					arr = this.$utils.shuffle(arr.concat(arr)) // 打乱顺序
					return this.getLargeArr(arr, len)
				}
				return arr.splice(0, len) // 截取需要的长度的列表
			},
			// 选择答案
			selectItemAnswer (item) {
				this.answers[this.selectIndex] = item.type
				if (this.answers.every(element => { return element !== null})) { // 所有题目都做完了
					console.log(this.answers)
					let param = []
					let data = this.$utils.groupByAttr(this.answers, (element) => { // 将测试结果分组
						return element
					}, true)
					this.$dicts.getDictArr('answerTypes').forEach(element => {
						let d = {}
						d.name = element.content
						d.data = data[element.value] ? data[element.value].length : 0
						param.push(d) // 组合结果数据, 用于饼状图
					})
					console.log('结果数据----------', param)
					uni.setStorage({
						key: 'res',
						data: JSON.stringify(param),
						success: () => {
							uni.showToast({
								icon: 'loading',
								title: '正在提交, 请稍候'
							})
						},
						fail: () => {
							uni.showToast({
								icon: 'none',
								title: '设置缓存失败, 请先检查数据'
							})
						}
					})
					uni.reLaunch({
						url: '../result/result'
					})
					return
				}
				this.selectIndex ++
			}
		},
		onLoad(option) {
			if (option && option.version === '2') {
				uni.setNavigationBarTitle({ // 修改顶部导航名称
					title: 'DISC完整版'
				})
			}
			uni.showLoading({
				title: '加载中'
			})
			this.version = option && option.version
			this.len = this.version === '2' ? 20 : 10
			for (let i = 0; i< this.len; i++) {
				this.answers[i] = null
			}
			this.getTests(this.len)
		}
	}
</script>

<style lang="scss">
page {
	/* background: #f0f3f7; */
	font-size: 28rpx;
	height: 100%;
}
.container {
	width: 100%;
	height: 100%;
	background: linear-gradient(#6592E8, #97B8ED);
	padding-top: 30upx;
	.question{
		font-size: 36upx;
		letter-spacing: 4upx;
		color: #ffffff;
		margin-bottom: 30upx;
	}
	.answer-box{
		.answer-item{
			background: #ffffff;
			color: #345C9C;
			margin-bottom: 30upx; 
			padding: 40upx 16upx;
			border-radius: 16upx;
			&:active {
				background: #FABD2E;
				color: #ffffff;
			}
		}
	}
	.bottom{
		text-align: center;
		margin-top: 26upx;
		margin-bottom: 30upx;
		color: #ffffff;
		.index-info{
			color: #FABD2E;
		}
	}
	.bold{
		font-weight: 700;
	}
	.mglr{
		margin-left: 40upx;
		margin-right: 40upx;
	}
}
</style>
