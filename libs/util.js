export default {
  install (Vue) {
    Vue.prototype.$utils = utils
  }
}

export const isJson = function (str){
	if (typeof str == 'string') {
		try {
			var obj=JSON.parse(str);
			if(typeof obj == 'object' && obj ){
				return true;
			}else{
				return false;
			}
		} catch(e) {
			console.log('error：'+str+'!!!'+e);
			return false;
		}
	}
}
export const isNumber = function (checkVal) {
	var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
	return reg.test(checkVal);
}

/**
 * 将列表的每一项根据属性分组, 返回一个二维列表或者json, value是list. 默认返回列表
 */
export const groupByAttr = (list, fn, needJson) => {
  const groups = {}
  list.forEach(function (o) {
    const group = JSON.stringify(fn(o)) // fn 回调函数
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  if (needJson) { return groups }
  return Object.keys(groups).map(function (group) {
    return groups[group]
  })
}

/**
 *  随机打乱数组顺序
 */
export const shuffle = (arr) => {
	let len = arr.length
	for (let i = 0; i<= len -1; i++) {
		let index = parseInt(Math.random() * (len - i));
		let temp = arr[index]
		arr[index] = arr[len -i - 1]
		arr[len - i - 1] = temp
	}
	return arr
}

const utils = {
	isJson,
	isNumber,
	groupByAttr,
	shuffle
}