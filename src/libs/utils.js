/*
 * @Desc:
 * @Author: yomuki
 * @Date: 2022-09-08 16:11:02
 * @LastEditors: yomuki
 * @LastEditTime: 2022-09-09 09:33:08
 */
/**
 * @description:
 * @param {number} val
 * @return {number}
 */
export function setIntSize(val) {
	const res = parseInt(val * WIN_SCALE);
	return res === 0 ? 1 : res;
}
