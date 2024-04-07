/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-08 14:51:34
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-08 14:53:27
 */
export default class EventBus {
	#eventMap;
	constructor() {
		this.#eventMap = new Map(); // 用于存储订阅事件的Map
	}
	/**
	 * @description: 订阅事件
	 * @param {String} name
	 * @param {Function} callback
	 * @return {Number} callbackId
	 */
	$on(name, callback) {
		this.#setEventCallback(name, callback);
	}
	/**
	 * @description: 发布事件
	 * @param {*} name
	 * @param {array} args
	 */
	$emit(name, ...args) {
		if (!this.#eventMap.size || !this.#eventMap.has(name)) return;
		const callbackMap = this.#eventMap.get(name);
		callbackMap.forEach((val, callback) => {
			callback(...args);
			if (val === "once") {
				this.$off(name, callback);
			}
		});
	}
	/**
	 * @description: 取消事件
	 * @param {*} name
	 * @param {*} callback
	 * @return {*}
	 */
	$off(name, callback) {
		if (!this.#eventMap.size || !this.#eventMap.has(name)) return;
		const callbackMap = this.#eventMap.get(name);
		if (!callbackMap.has(callback)) return;
		callbackMap.delete(callback);
		if (callbackMap.size) return;
		this.#eventMap.delete(name);
	}
	/**
	 * @description: 订阅一次性事件
	 * @param {*} name
	 * @param {*} callback
	 * @return {*}
	 */
	$once(name, callback) {
		this.#setEventCallback(name, callback, "once");
	}
	/**
	 * @description: 设置事件回调
	 * @param {*} name
	 * @param {*} callback
	 * @param {*} callbackType
	 * @return {*}
	 */
	#setEventCallback(name, callback, callbackType = "on") {
		if (!this.#eventMap.has(name)) {
			this.#eventMap.set(name, new Map());
		}
		this.#eventMap.get(name).set(callback, callbackType);
	}
}
export const appEventbus = new EventBus();
