module.exports = {
	fucReverse: {
		//处理函数混淆配置
		"originJS": "./origin/mgr.js", 		//源JS文件path
		"newJS": "./new_mgr.js",			//新输出JS文件名称
		"analyzeJS": "./origin/analyze.js",			//处理函数混淆方法的JS文件
		"RegPatterns" : [			//正则匹配规则列表
			/i1m\(\".*?\"\)/g,
			/z4X\(\".*?\"\)/g,
			/xN6\(\".*?\"\)/g,
			/V5E\(\".*?\"\)/g,
			/vwy\(\".*?\"\)/g,
		]
	},
	arrReverse: {
		//处理数组混淆配置
	}
}
