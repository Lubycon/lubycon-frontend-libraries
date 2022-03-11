/**
 *
 * value가 안전한 정수인지 확인합니다.
 *
 * **Note:** 이 메소드 아래 메소드를 사용합니다.
 * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
 *
 * @param {any} value - 확인할 값
 * @returns {boolean} 만약 value가 안전한 정수라면 `true`를, 그렇지 않다면 `false`를 반환합니다.
 * @example
 *```js
 * isSafeInteger(3);
 * // => true
 *
 * isSafeInteger(Number.MIN_VALUE);
 * // => false
 *
 * isSafeInteger(Infinity);
 * // => false
 *
 * isSafeInteger('3');
 * // => false
 * ```
 */

function isNull(value: any): value is null {
  return value === null;
}

export default isNull;
