<template>
	<view class="container">
		<view class="question bold mglr">{{tests[selectIndex].question}}</view>
		<view class="answer-box mglr">
			<radio-group @change="selectItemAnswer">
				<label v-for="(item, index) in tests[selectIndex].anwsers || []" :key="index">
					<view class="answer-item">
						<!-- <radio :value="item.value" :checked="item.value === selectedVersion"></radio> -->
						<text>{{item.content}}</text>
					</view>
				</label>
			</radio-group>
			<view class="answer-item" v-for="(item, index) in answerList" :key="index">{{item.content}}</view>
			<view class=""></view>
		</view>
		<view class="bottom">
			----<text class="index-info">第{{selectIndex + 1}}题 / 共{{version === '2' ? 40 : 10}}题</text>----
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return{
				version: '1',
				selectIndex: 0, // 当前第几个问题
				tests: [
					{ id: 1, question: '你觉得你在同事(同学)眼中是哪一种人?', anwsers: [
						{ value: 1, content: '积极、热情、有行动力的人' },
						{ value: 2, content: '忠诚、随和、容易相处的人' },	
						{ value: 3, content: '活泼、开朗、风趣幽默的人' },	
						{ value: 4, content: '谨慎、冷静、注意细节的人' },
						],
					},
					{ id: 1, question: '你觉得下面哪个选项更适合你?', anwsers: [
						{ value: 1, content: '坚持不懈: 要完成现有的事情才能做新的事' },
						{ value: 2, content: '喜好娱乐: 开心充满乐趣与幽默感' },	
						{ value: 3, content: '善于说服: 用逻辑和事实而不用威严和权力服人' },	
						{ value: 4, content: '平和: 在冲突中不受干扰,保持平静' },
						],
					}
				]
			}
		},
		methods: {
			selectItemAnswer (e) {
				console.log('选中单项--------------', e.target)
			}
		},
		onLoad(option) {
			this.version = option && option.version
			if (option && option.version === '2') {
				uni.setNavigationBarTitle({
					title: 'DISC完整版'
				})
			}
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
