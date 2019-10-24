<template>
	<view class="res-detail-container vertical-section-box" style="display: flex;flex-direction: column;">
		<!-- <c-tabs class="section-top"> -->
			<view class="ht-tabs section-top">
				<view><text class="ht-tabs-title" 
					:class="{'active': activeIndex==0}" @tap="activeIndex=0">情感</text></view>
				<view><text class="ht-tabs-title"
					:class="{'active': activeIndex==1}" @tap="activeIndex=1">人际</text></view>
				<view><text class="ht-tabs-title"
					:class="{'active': activeIndex==2}" @tap="activeIndex=2">工作</text></view>
				<view><text class="ht-tabs-title"
					:class="{'active': activeIndex==3}" @tap="activeIndex=3">有点</text></view>
				<view><text class="ht-tabs-title"
					:class="{'active': activeIndex==4}" @tap="activeIndex=4">缺点</text></view>
			</view>
		<!-- </c-tabs> -->
		<view class="section-middle" style="flex: 1;display: flex;flex-direction: column;">
			<swiper @change="swipeChange" :current="activeIndex" duration='300' style="flex: 1;">
			  <swiper-item style="height: 100%;">
				  <view v-for="(item, index) in resDetails" :key="index"  class="section-middle msg-container">
				  	<!-- 可能会有混合类型(disc型的选中的个数可能会有相同的) 故需要列表-->
				  	<view class="msg-item" :key="i">
				  		<view class="log"></view>
				  		<view class="content">{{item.qgContent}}</view>
				  	</view>
				  </view>
			  </swiper-item>
			  <swiper-item>
				  <view v-for="(item, index) in resDetails" :key="index"  class="section-middle msg-container">
					<!-- 可能会有混合类型(disc型的选中的个数可能会有相同的) 故需要列表-->
					<view class="msg-item" :key="i">
						<view class="log"></view>
						<view class="content">{{item.workContent}}</view>
					</view>
				  </view>
			  </swiper-item>
			  <swiper-item style="height: 100%;">
				  <view v-for="(item, index) in resDetails" :key="index"  class="section-middle msg-container">
					<!-- 可能会有混合类型(disc型的选中的个数可能会有相同的) 故需要列表-->
					<view class="msg-item" :key="i">
						<view class="log"></view>
						<view class="content">{{item.rjContent}}</view>
					</view>
				  </view>
			  </swiper-item>
			  <swiper-item>
				  <view v-for="(item, index) in resDetails" :key="index"  class="section-middle msg-container">
					<!-- 可能会有混合类型(disc型的选中的个数可能会有相同的) 故需要列表-->
					<view class="msg-item" :key="i">
						<view class="log"></view>
						<view class="content">{{item.yd}}</view>
					</view>
				  </view>
			  </swiper-item>
			  <swiper-item>
				  <view v-for="(item, index) in resDetails" :key="index"  class="section-middle msg-container">
					<!-- 可能会有混合类型(disc型的选中的个数可能会有相同的) 故需要列表-->
					<view class="msg-item" :key="i">
						<view class="log"></view>
						<view class="content">{{item.qd}}</view>
					</view>
				  </view>
			  </swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import '@/static/style/common.css'
	// import ResItem from './components/res-item/res-item.vue'
	export default {
		// components: {
		// 	'res-item': ResItem
		// },
		data() {
			return {
				activeIndex: 0,
				resDetails: []
			};
		},
		methods: {
			getData () {
				uni.getStorage({
					key: 'res',
					success: (r) => {
						let maxItem = JSON.parse(r.data).sort((a, b) => {
							return b.data - a.data
						})[0]
						let items = JSON.parse(r.data).filter(element => { // 被选中个数最多的数据, 可能会有多个同样个数的, 故用列表
							return element.data === maxItem.data
						})
						let i = items.map(elment => elment.name) // 根据选中的数据, 获取选中的名称列表, 用于对详细答案进行过滤
						this.resDetails = JSON.parse(JSON.stringify(this.$dicts.getDictArr('resDetail'))).filter(element => { // 将数组转字符串再转数组, 防止浅拷贝修改源数据
							return i.includes(element.label) // 过滤详细答案
						})
						console.log('resDetails----------', this.resDetails)
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '获取测试结果失败' // 从缓存中没能拿出测试结果, 前端问题
						})
					}
				})
			},
			swipeChange(event) {
				this.activeIndex = event.detail.current;
			}
		},
		onLoad () {
			this.getData()
		}
	}
</script>

<style lang="scss">
page {
	/* background: #f0f3f7; */
	font-size: 28rpx;
	height: 100%;
}
.res-detail-container{
	width: 100%;
	height: 100%;
	background: linear-gradient(#6592E8, #97B8ED);
	// padding-top: 30upx;
}
/* tabs样式 */

.ht-tabs {
	display: flex;
	width: 100%;
	height: 84upx;
	// background: #fff;
	background: #618FE8;
	color: #fff;
	margin-bottom: 20upx;
}

.ht-tabs view {
	flex: 1;
	text-align: center;
}

.ht-tabs-title {
	display: inline-block;
	font-size: 30upx;
	height: 78upx;
	line-height: 78upx;
	color: #fff;
	border-bottom: none;
	position: relative;
}

.ht-tabs-msgNum {
	position: absolute;
	top: 4upx;
	right: -34upx;
	background: #f43a3a;
	border-radius: 16upx;
	color: #fff;
	display: inline-block;
	width: 34upx;
	height: 32upx;
	line-height: 32upx;
	font-size: 20upx;
}

.ht-tabs .active {
	color: #FABD2E;
	border-bottom: 6upx solid #FABD2E;
}
/* 垂直flex布局 */
.vertical-section-box {
	height: 100%;
	width: 100%;
	display: flex;
	font-size: 30upx;
	overflow: hidden;
	color: #525d6b;
	flex-direction: column;
}

.vertical-section-box .section-top {
	width: 100%;
}

.vertical-section-box .section-bottom {
	width: 100%;
}

.vertical-section-box .section-middle {
	flex: 1;
	box-sizing: border-box;
	overflow-y: auto;
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
