<template>
	<view class="container">
		<view class="vertical-section-box" style="height: 100%;">
			<view class="section-middle msg-container">
				<view class="msg-item" v-for="(item, index) in descList" :key="index">
					<view class="log"></view>
					<view class="content">{{item.content}}</view>
				</view>
				<view class="msg-item" style="height: 130upx;align-items: center;">
					<view class="log"></view>
					<view class="content">
						<radio-group @change="changeVersion">
							<label style="display: inline-block;" v-for="(item, index) in versionList" :key="index">
								<view :class="{'mgr' : index !== 0}">
									<radio :value="item.value" :checked="item.value === selectedVersion" style="transform:scale(0.7)"></radio>
									<text>{{item.content}}</text>
								</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="section-bottom">
				<view class="common-btn btn" @click="goTest">开始测试</view>
			</view>
		</view>
	</view>
</template>

<script>
	import '@/static/style/common.css'
	export default {
		data() {
		  return {
			descList: this.$dicts.getDictArr('descList'),
			versionList: [
				{ value: '1', content: '简易版' },
				{ value: '2', content: '完整版' }
			],
			selectedVersion: '1'
		  }
		},
		onLoad(param) {
			console.log('首页执行onload方法, param为---------', param)
		},
		methods: {
			changeVersion (e) {
				this.selectedVersion = e.target.value
				console.log('this.selectedVersion', this.selectedVersion)
			},
			goTest () {
				console.log('selectedVersion', this.selectedVersion)
				uni.navigateTo({
					url: '../questions/questions?version=' + this.selectedVersion
					// url: '../result/result'
				})
			}
		}
	}
</script>

<style lang="scss">
.btn{
	height: 90upx;
	background: #FABD2E;
}
.msg-item{
	display: flex;
	padding: 20upx 80upx 0 32upx;
	.log{
		display: inline-block;
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
		background: #ffffff
	}
	.content{
		flex: 1;
		height: auto;
		background: #ffffff;
		color: #345C9C;
		padding: 20upx 40upx;
		border-radius: 16upx;
		margin-left: 30upx;
		font-size: 32upx;
		word-spacing: 8upx;
		letter-spacing: 2upx;
	}
}
.mgr{
	margin-left: 36upx; 
}
</style>
