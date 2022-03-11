/**
 * value가 `WeakMap` 객체인지 확인합니다.
 *
 * @param {any} value - 확인할 값
 * @returns {boolean} 만약 value가 `WeakMap` 객체이면 `true`를, 그렇지 않다면 `false`를 반환합니다.
 * @example
 *
 * ```js
 * isWeakMap(new WeakMap);
 * // => true
 *
 * isWeakMap(new Map);
 * // => false
 * ```
 */

function isWeakMap(value: any): value is WeakMap<any, any> {
  return value instanceof WeakMap;
}

export default isWeakMap;
