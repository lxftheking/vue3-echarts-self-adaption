/*
 * @Desc:
 * @Author: 曾茹菁
 * @Date: 2022-01-28 11:43:07
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-08 14:45:51
 */
import "@/libs/rem";
import { createApp } from "vue"; // Vue 3.x 引入 vue 的形式
import style from "@/assets/style/index";
import App from "./App.vue"; // 引入 APP 页面组建
import store from "./store"; // store
style();
const app = createApp(App); // 通过 createApp 初始化 app
app.use(store);
app.mount("#root"); // 将页面挂载到 root 节点
