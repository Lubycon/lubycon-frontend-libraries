/**
 * value가 유한한 숫자인지 확인합니다.
 * * **Note:** 이 함수는 `Number.isFinite`를 사용합니다.
 * [`Number.isFinite`](https://mdn.io/Number/isFinite).
 *
 * @param {any} value - 확인할 값
 * @returns {boolean} value가 유한한 숫자이면 `true` 아니면 `false`
 * @example
 *```js
 * isFinite(3);
 * // => true
 *
 * isFinite(Number.MIN_VALUE);
 * // => true
 *
 * isFinite(Infinity);
 * // => false
 *
 */

function isFinite(value: number) {
  return Number.isFinite(value);
}

export default isFinite;
