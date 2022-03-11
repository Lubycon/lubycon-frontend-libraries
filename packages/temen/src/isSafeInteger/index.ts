/**
 *
 * value가 안전한 정수인지 확인합니다.
 * 정수는 IEEE-754 더블 프로퍼티 수치이고, 안전한 정수가 아닌 경우에는 반올림된 안전한 정수가 아닙니다.
 *
 * **Note:** 이 함수는 `Number.isSafeInteger`를 사용합니다.
 * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
 *
 * @param {any} value - 확인할 값
 * @returns {boolean} 만약 value가 안전한 정수이면 `true`를, 그렇지 않다면 `false`를 반환합니다.
 * @example
 *
 * ```js
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

function isSafeInteger(value: number) {
  return Number.isSafeInteger(value);
}

export default isSafeInteger;
