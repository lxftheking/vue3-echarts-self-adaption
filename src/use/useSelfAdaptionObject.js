/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-08 16:32:14
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-08 17:55:18
 */
import { appEventbus } from "@/libs/EventBus";
import { setIntSize } from "@/libs/utils";
import { has, get, set } from "lodash-es";
export default (optionObj, sizeProp = []) => {
	const originalSizeMap = new Map();
	function init() {
		console.log("useEchartsOption -- init");
		sizeProp.forEach((item) => {
			if (has(optionObj, item)) {
				originalSizeMap.set(item, get(optionObj, item));
				set(optionObj, item, setIntSize(get(optionObj, item)));
			}
		});
	}
	function handleResize() {
		console.log("useEchartsOption -- handleResize");
		sizeProp.forEach((item) => {
			if (originalSizeMap.has(item) && has(optionObj, item)) {
				set(optionObj, item, setIntSize(originalSizeMap.get(item)));
			}
		});
	}
	appEventbus.$on("resize", handleResize);
	init();
	return optionObj;
};
