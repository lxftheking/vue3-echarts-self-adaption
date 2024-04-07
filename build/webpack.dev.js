/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-01-29 11:36:51
 * @LastEditors: 曾茹菁
 * @LastEditTime: 2022-09-08 13:28:50
 */
const { merge } = require("webpack-merge"),
	common = require("./webpack.base.js"),
	{ rootPath } = require("./utils.js");
module.exports = merge(common, {
	mode: "development",
	output: {
		// filename: "js/[name].[hash].js", // 每次保存 hash 都变化 加快dev环境 去掉hash
		filename: "js/[name].js",
		path: rootPath("dist"),
		clean: true,
	},
	// 开发工具，开启 source map，编译调试 可以将编译后的代码映射回原始源代码。
	devtool: "eval-cheap-module-source-map",
	module: {},
	devServer: {
		hot: true, //热更新
		open: false, //编译完自动打开浏览器
		compress: true, //开启gzip压缩
		port: process.env.APP_PORT, //开启端口号
		//托管的静态资源文件
		//可通过数组的方式托管多个静态资源文件
		static: {
			directory: rootPath("public"),
		},
		client: {
			//在浏览器端打印编译进度
			progress: true,
		},
	},
});
