export default {
  install (Vue) {
    Vue.prototype.$dicts = dicts
  }
}
export const dictArr = {
	// 首页关于disc的描述
	descList: [
		{ value: 1, content: 'Hi!欢迎来到DISC性格测试~' },
		{ value: 2, content: 'DISC是指支配性(Dominance) 、影响性(Influence) 、稳定性(Steadiness)和服从性(Compliance)四个性格维度。' },
		{ value: 3, content: 'DISC不同于常见的一些玄学的心理测试，而是通过测试帮助人们评估和认识自己，进而改善行为方式。' },
		{ value: 4, content: '这里提供简易版和完整版两个版本。简易版包含10个问题，用时约3分钟，更快速;完整版包含40道题用时约15分钟，更准确。' },
		{ value: 5, content: '当你回答问题时,请想象你是身处于平常工作生活环境中的自己。这不是考试，没有对错，你只需要根据直觉诚实的回答哦，如果两个版本结果有出入，请以完整版结果为准。选择版本然后开始吧' }
	]
}

export const getDict = key => {
  var arr = dictArr[key]
  var dict = {}
  for (var i = 0; i < arr.length; i++) {
    dict[arr[i].value + ''] = arr[i].label
  }
  return dict
}

export const getDictArr = key => {
  return dictArr[key]
}

const dicts = { dictArr, getDict, getDictArr }

