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
	],
	// value对应的答案类型
	answerTypes: [
		{ value: 1, content: 'D' },
		{ value: 2, content: 'I' },
		{ value: 3, content: 'S' },
		{ value: 4, content: 'C' }
	],
	// 问卷模板数据
	testData: [
		{ id: 1, question: '你觉得你在同事(同学)眼中是哪一种人?', anwsers: [
			{ type: 1, content: '积极、热情、有行动力的人' },
			{ type: 2, content: '忠诚、随和、容易相处的人' },	
			{ type: 3, content: '活泼、开朗、风趣幽默的人' },	
			{ type: 4, content: '谨慎、冷静、注意细节的人' },
			]
		},
		{ id: 2, question: '你觉得下面哪个选项更适合你?', anwsers: [
			{ type: 1, content: '坚持不懈: 要完成现有的事情才能做新的事' },
			{ type: 2, content: '喜好娱乐: 开心充满乐趣与幽默感' },	
			{ type: 3, content: '善于说服: 用逻辑和事实而不用威严和权力服人' },	
			{ type: 4, content: '平和: 在冲突中不受干扰,保持平静' },
			]
		},
		{ id: 3, question: '你喜欢看哪一类型的杂志?', anwsers: [
			{ type: 1, content: '科技、专业、技术类' },
			{ type: 2, content: '旅游、美食、时尚类' },	
			{ type: 3, content: '管理、财经、趋势类' },	
			{ type: 4, content: '心灵、散文、家庭类' },
			]
		},
		{ id: 4, question: '你做决策的方式?', anwsers: [
			{ type: 1, content: '有时间考虑或寻求他人意见' },
			{ type: 2, content: '要有详细的资料评估' },	
			{ type: 3, content: '感觉重于一切' },	
			{ type: 4, content: '希望能立即有效' },
			]
		},
		{ id: 5, question: '职务上哪种工作室你最擅长的?', anwsers: [
			{ type: 1, content: '良好的口才,能主动的与人建立联系' },
			{ type: 2, content: '流程的掌握,注意到细节' },	
			{ type: 3, content: '以目标为导向,有不服输的精神' },	
			{ type: 4, content: '能配合团队,扮演忠实的拥护者' },
			]
		},
		{ id: 6, question: '当面对压力时,你会?', anwsers: [
			{ type: 1, content: '希望找人倾述,获得认同' },
			{ type: 2, content: '重新思考缘由,必要时做精细的解说' },	
			{ type: 3, content: '用行动力去面对它,并且克服它' },	
			{ type: 4, content: '逆来顺受,尽量避免冲突' },
			]
		},
		{ id: 7, question: '与同事(同学)之间的相处?', anwsers: [
			{ type: 1, content: '重视气氛,能动带动团队氛围' },
			{ type: 2, content: '良好的倾听者,对人的态度温和和善' },	
			{ type: 3, content: '被动,不会主动与人建立联系' },	
			{ type: 4, content: '以公事为主,很少谈到个人生活' },
			]
		},
		{ id: 8, question: '你希望别人如何与你沟通?', anwsers: [
			{ type: 1, content: '凡事说清楚,讲明白' },
			{ type: 2, content: '不要一次说太多,要给予明确的支持' },	
			{ type: 3, content: '直接讲重点,不要拐弯抹角' },	
			{ type: 4, content: '轻松,不要太严肃' },
			]
		},
		{ id: 9, question: '要完成一件事时,你最看重的部分是?', anwsers: [
			{ type: 1, content: '效果是否有达到' },
			{ type: 2, content: '过程是否快乐' },	
			{ type: 3, content: '前后是否有改变' },	
			{ type: 4, content: '流程是否正确' },
			]
		},
		{ id: 10, question: '什么事情会让你恐惧?', anwsers: [
			{ type: 1, content: '过度变动,让人无所适从' },
			{ type: 2, content: '制度不清,标准不一' },	
			{ type: 3, content: '失去认同,被人排挤' },	
			{ type: 4, content: '呈现弱点,被人利用' },
			]
		}
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

