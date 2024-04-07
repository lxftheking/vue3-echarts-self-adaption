/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-01-29 11:52:52
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-08 14:40:38
 */
const autoprefixer = require("autoprefixer");
module.exports = {
	plugins: [
		autoprefixer({
			// browsers: ["last 10 Chrome versions", "last 5 Firefox versions", "Safari >= 6", "ie> 8"],
		}),
		require("postcss-pxtorem")({
			rootValue: 16, // 换算的基数
			selectorBlackList: [], // 忽略转换正则匹配项 列入一些ui库, ['.el'] 就是忽略elementUI库
			propList: ["*"],
		}),
	],
};
