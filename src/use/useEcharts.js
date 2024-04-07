/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-08 13:35:15
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-08 22:48:23
 */
import echarts from "@/plugins/echarts";
import { ref, shallowRef, onMounted, onBeforeUnmount } from "vue";
import { appEventbus } from "@/libs/EventBus";
/**
 * @description: 基础使用echarts
 * @param {*} option echarts option
 * @param {*}  fnOption.renderer svg/canvas
 * @param {*}  fnOption.initImmediately 是否在mounted立即init
 * @param {*} fnOption.chartRef 用来渲染echarts的元素的ref
 * @param {*} fnOption.resize 是否在window.resize时resize
 * @return {*} {chartObj,chartRef,chartInit,chartShow,chartUpdate,chartReload}
 */
export default (option = {}, fnOption = { renderer: "svg", initImmediately: true, chartRef: ref(null), resize: true }) => {
	const { renderer = "svg", initImmediately = true, chartRef = ref(null), resize = true } = fnOption;
	const chartObj = shallowRef(null); // 只监听第一层数据的变化
	/**
	 * @description: 载入echarts
	 * @return {*}
	 */
	const init = (themeName = "customed") => {
		if (chartRef.value) {
			chartObj.value = echarts.init(chartRef.value, themeName, { renderer });
		}
	};
	/**
	 * @description: 销毁echarts
	 * @return {*}
	 */
	const dispose = () => {
		if (chartObj.value) chartObj.value?.dispose();
	};
	/**
	 * @description: 设置Option - 创建新的
	 * @return {*}
	 */
	const setOption = () => {
		chartObj.value?.setOption(option, true);
	};
	/**
	 * @description: 更新Option - 合并数据 （普通合并）- 更新 @see https://echarts.apache.org/zh/api.html#echartsInstance.setOption
	 * @return {*}
	 */
	const updateOption = () => {
		chartObj.value?.setOption(option);
	};
	/**
	 * @description: 重载chart。销毁 - init - setoption
	 * @return {*}
	 */
	const chartReload = () => {
		dispose();
		init();
		setOption();
	};
	if (resize) {
		appEventbus.$on("update-theme", () => {
			console.log("update-theme");
			chartReload();
		});
	}
	onMounted(() => {
		if (initImmediately) {
			init();
		}
	});
	onBeforeUnmount(() => {
		dispose();
	});
	return {
		chartObj,
		chartRef,
		chartInit: init,
		chartShow: setOption,
		chartUpdate: updateOption,
		chartReload,
	};
};
