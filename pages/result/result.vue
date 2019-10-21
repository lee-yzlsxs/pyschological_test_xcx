<template>
	<view class="qiun-columns">
		<!--#ifdef H5 -->
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">页面地址</view>
		</view>
		<view class="qiun-bg-white qiun-padding">
		    <text>pages/basic/pie/pie</text>
		</view>
		<!--#endif-->
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">饼状图</view>
		</view>
		<view class="qiun-charts" >
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchPie"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
			<!--#endif-->
		</view>
		<!-- <view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">标准数据格式</view>
		</view>
		<view class="qiun-bg-white qiun-padding">
		    <textarea class="qiun-textarea" auto-height="true" maxlength="-1" v-model="textarea"/>
		</view>
		<view class="qiun-text-tips">Tips：修改后点击更新图表</view>
		<button class="qiun-button" @tap="changeData()">更新图表</button> -->
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var canvaPie=null;
   
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:''
			}
		},
		onLoad() {
			let _self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					console.log('systemInfo--------------', res)
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData(){
				let _self = this
				// 请求接口获取数据
				let pie = {
					series: []
				}
				/* pie = {
					series: [{
						"name": "一班",
						"data": 50
					  }, {
						"name": "二班",
						"data": 30
					  }, {
						"name": "三班",
						"data": 20
					  }, {
						"name": "四班",
						"data": 18
					  }, {
						"name": "五班",
						"data": 8
					  }]
					} */
					console.log('走到获取缓存')
				uni.getStorage({
					key: 'res',
					success: (r) => {
						console.log('拿到结果数据-------', r)
						pie.series = JSON.parse(r.data)
						_self.textarea = JSON.stringify(pie);
						_self.showPie("canvasPie",pie);
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '获取测试结果失败' // 从缓存中没能拿出测试结果, 前端问题
						})
					}
				})
				// _self.textarea = JSON.stringify(pie);
				// _self.showPie("canvasPie",pie);
			},
			showPie(canvasId,chartData){
				console.log('執行了showPie')
				let _self = this
				canvaPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					padding:[15,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
              border:true,
              borderColor:'#FFFFFF',
              borderWidth:3
						}
					},
				});
			},
			touchPie(e){
				console.log('执行了touchPie')
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.data 
					}
				});
				canvaPie.touchLegend(e,{animation:true});
			},
			changeData(){
				console.log('执行了changeData')
				console.log('utils----------', this.$utils)
				if(this.$utils.isJSON(this.textarea)){
					let newdata=JSON.parse(this.textarea);
					canvaPie.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
						image:'../../../static/images/alert-warning.png'
					})
				}
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
