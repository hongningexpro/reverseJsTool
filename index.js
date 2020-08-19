const CONFIG = require('./config.js');
const fs = require('fs');

// 函数混淆处理
function reverseFuc() {
	
	let startTs = new Date().getTime();
	let replaceCnt = 0;
	let originJS = CONFIG.fucReverse.originJS;
	let analyzeJS = CONFIG.fucReverse.analyzeJS;
	let newJS = CONFIG.fucReverse.newJS;
	let oldJS = "";
	fs.accessSync(originJS, fs.constants.R_OK, (err) => {
		console.log(`${originJS} ${err ? '不可读': '可读'}`)
		if (err) return;
	});
	fs.accessSync(analyzeJS, fs.constants.R_OK, (err) => {
		console.log(`${analyzeJS} ${err ? '不可读': '可读'}`)
		if (err) return;
	});
	let analyzeFuc = require(analyzeJS);
	
	oldJS = fs.readFileSync(originJS).toString(); 

	// 正则匹配
	CONFIG.fucReverse.RegPatterns.forEach(p=>{
		let reg = new RegExp(p);
		let matchedStrs = oldJS.match(reg);
		matchedStrs.forEach(m=>{
			// 取中间参数
			let r = new RegExp(/\"(.*)\"/g);
			let param = m.match(r)[0];
			// 取消两边引号
			param = param.substring(1, param.length-1);
			let result = analyzeFuc(param);
			//console.log(result);
			// 替换文本	
			while (oldJS.indexOf(m) !== -1) {
				console.log(`把${m}替换成"${result}"`);
				if (result.indexOf('$') !== -1) {
					let startIdx = oldJS.indexOf(m);
					oldJS = oldJS.substring(0, startIdx) + `"${result}"` + oldJS.substring(startIdx+m.length);
				} else {
					oldJS = oldJS.replace(m, `"${result}"`);
				}
				replaceCnt +=1;
			}
		});
	});
	
	// 写出文件
	const data = new Uint8Array(Buffer.from(oldJS));
	fs.writeFileSync(newJS, data);
	let endTs = new Date().getTime();
	console.log(`还原完成，总共替换: ${replaceCnt}次, 耗时: ${endTs-startTs}ms`);
}

// 数组混淆处理
function reverseArr() {

}

reverseFuc();
