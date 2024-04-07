<!--
 * @Desc: 
 * @Author: yomuki
 * @Date: 2022-09-08 13:24:48
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-09 10:28:25
-->
<template>
	<div class="home">
		<div ref="chartRef" class="chart"></div>
	</div>
</template>

<script setup>
import useEcharts from "@/use/useEcharts";
import useEchartsAutoplay from "@/use/useEchartsAutoplay";
import useSelfAdaptionObject from "@/use/useSelfAdaptionObject";
import { onMounted } from "vue";
const options = {
	xAxis: {
		type: "category",
		data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	},
	yAxis: {
		type: "value",
	},
	tooltip: {
		trigger: "axis",
		textStyle: {
			fontSize: 16,
		},
	},
	series: [],
};
const option = useSelfAdaptionObject(options, ["tooltip.textStyle.fontSize"]);
const { chartShow, chartRef, chartUpdate, chartObj } = useEcharts(option);
const { createAutoPlay } = useEchartsAutoplay(chartObj, { showTip: true });
onMounted(() => {
	chartShow();
	setTimeout(() => {
		option.series.push({
			data: [150, 230, 224, 218, 135, 147, 260],
			type: "line",
			markPoint: useSelfAdaptionObject(
				{
					data: [
						{ type: "max", name: "Max" },
						{ type: "min", name: "Min" },
					],
					symbolSize: 50,
					label: {
						fontSize: 16,
					},
				},
				["label.fontSize", "symbolSize"]
			),
		});

		chartUpdate();
		createAutoPlay(7);
	}, 700);
});
</script>
