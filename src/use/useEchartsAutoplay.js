import { computed, onBeforeUnmount, ref } from "vue";

export default (chartObj, option = { delay: 3000, showTip: false, showHighlight: false, customPlayFn: null }) => {
	const { delay = 3000, showTip = false, showHighlight = false, customPlayFn = null } = option;
	let timer = null, // 循环器对象
		maxIndex = 0; // 最大索引
	const activeIndex = ref(0), // 当前播放到的数据索引
		isSuspend = ref(false), // 是否暂停
		preIndex = computed(() => {
			return activeIndex.value - 1 < 0 ? maxIndex : activeIndex.value - 1;
		}), // 上一个播放索引
		/**
		 * @description: 创建自动播放
		 * @param {number} dataLength 数据长度
		 * @return {*}
		 */
		createAutoPlay = (dataLength) => {
			// 如果计时器已存在，清空计时器。防止有多个自动播放存在
			if (timer) {
				clearAutoplay();
			}
			// 最大索引
			maxIndex = dataLength - 1;
			// 设置echarts的鼠标事件 鼠标移入暂停播放 移出继续播放
			setMouseoverEvent();
			autoplayFn();
			timer = setInterval(() => {
				if (!isSuspend.value) {
					activeNext();
					autoplayFn();
				}
			}, delay);
		};
	/**
	 * @description: 播放处理
	 */
	function autoplayFn() {
		if (customPlayFn) {
			customPlayFn();
		}
		showTip && handleShowTip(activeIndex.value);
		if (showHighlight) {
			// 关闭上一个高亮再显示下一个高亮
			handleHideHighlight(preIndex.value);
			handleShowHighlight(activeIndex.value);
		}
	}
	/**
	 * @description: 显示提示框
	 * @param {*} dataIndex
	 * @param {*} seriesIndex
	 */
	function handleShowTip(dataIndex = 0, seriesIndex = 0) {
		chartObj.value?.dispatchAction({
			type: "showTip",
			seriesIndex: seriesIndex,
			playState: true,
			dataIndex: dataIndex,
		});
	}
	/**
	 * @description: 显示高亮
	 * @param {*} dataIndex
	 * @param {*} seriesIndex
	 */
	function handleShowHighlight(dataIndex = 0, seriesIndex = 0) {
		chartObj.value?.dispatchAction({
			type: "highlight",
			playState: true,
			seriesIndex: seriesIndex,
			dataIndex: dataIndex,
		});
	}
	/**
	 * @description: 关闭高亮
	 * @param {*} dataIndex
	 * @param {*} seriesIndex
	 */
	function handleHideHighlight(dataIndex = 0, seriesIndex = 0) {
		chartObj.value?.dispatchAction({
			type: "downplay",
			playState: true,
			seriesIndex: seriesIndex,
			dataIndex: dataIndex,
		});
	}
	/**
	 * @description: 激活下一个
	 * @return {*}
	 */
	function activeNext() {
		activeIndex.value = activeIndex.value + 1 > maxIndex ? 0 : activeIndex.value + 1;
	}
	/**
	 * @description: 设置echarts的鼠标事件
	 * @return {*}
	 */
	function setMouseoverEvent() {
		// 鼠标移入 暂停
		chartObj.value?.on("mouseover", () => {
			isSuspend.value = true;
		});
		// 鼠标移出 不暂停
		chartObj.value?.on("globalout", () => {
			isSuspend.value = false;
		});
	}
	/**
	 * @description: 清除自动播放
	 * @return {*}
	 */
	function clearAutoplay() {
		activeIndex.value = 0;
		clearInterval(timer);
	}
	onBeforeUnmount(() => {
		if (timer) clearInterval(timer);
	});
	return {
		activeIndex,
		isSuspend,
		createAutoPlay,
	};
};
