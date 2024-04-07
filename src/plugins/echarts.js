/*
 * @Desc:引入echarts
 * @Author: yomuki
 * @Date: 2022-09-08 13:33:33
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-09 08:17:43
 */
import * as echarts from "echarts/core";
import { BarChart, PieChart, LineChart } from "echarts/charts";
import { TooltipComponent, MarkPointComponent, GridComponent } from "echarts/components";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import useEchartsTheme from "@/use/useEchartsTheme";
import { appEventbus } from "@/libs/EventBus";

// 注入自定义主题
echarts.registerTheme("customed", useEchartsTheme());
// 注册必须的组件
echarts.use([BarChart, PieChart, TooltipComponent, CanvasRenderer, SVGRenderer, LineChart, MarkPointComponent, GridComponent]);
async function handleResize() {
	await echarts.registerTheme("customed", useEchartsTheme());
	appEventbus.$emit("update-theme");
}
appEventbus.$on("resize", handleResize);
export default echarts;
