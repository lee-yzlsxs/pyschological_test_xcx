<template>
	<view>
		<c-ucharts :chartType="'pie'" :opts="resData" :canvansId="'ucharts-pie'"></c-ucharts>
	</view>
</template>

<script>
import uCharts from '@/js_sdk/u-charts/u-charts/component.vue'
export default {
	comments: {
		'c-ucharts': uCharts
	},
	data() {
		return {
			resData: {
			  "series": [{
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
			}
		}
	}
}
</script>

<style lang="scss">

</style>
