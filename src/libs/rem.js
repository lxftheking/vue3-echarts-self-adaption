/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-08 14:44:02
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-08 15:16:24
 */
import { debounce } from "lodash-es";
import { appEventbus } from "./EventBus";
// 基准大小
const baseSize = 16;
// 设置 rem 函数
function setRem() {
	const scaleWidth = document.documentElement.clientWidth / 1920;
	const scaleHeight = document.documentElement.clientHeight / 1080;
	WIN_SCALE = Math.min(scaleWidth, scaleHeight);
	// 设置页面根节点字体大小, 字体大小最小为12
	let fontSize = baseSize * WIN_SCALE > 12 ? baseSize * WIN_SCALE : 12;
	document.documentElement.style.fontSize = fontSize + "px";
}
//初始化
setRem();
//改变窗口大小时重新设置 rem
const handleResize = debounce(function () {
	setRem();
	appEventbus.$emit("resize");
}, 1000);
window.onresize = handleResize;
