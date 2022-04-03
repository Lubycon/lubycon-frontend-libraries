/**
 * `value`가 `other`보다 작으면 `true`를 반환합니다.
 *
 * @param {*} value 비교할 값
 * @param {*} other 다른 비교할 값
 * @returns {boolean} `value`가 `other`보다 작으면 `true`
 * @example
 *
 * _.lt(1, 3);
 * // => true
 *
 * _.lt(3, 3);
 * // => false
 *
 * _.lt(3, 1);
 * // => false
 */
export function lt(a: number, b: number) {
  return a < b;
}

/**
 * `value`가 `other`보다 작거나 같으면 `true`를 반환합니다.
 *
 * @param {*} value 비교할 값
 * @param {*} other 다른 비교할 값
 * @returns {boolean} `value`가 `other`보다 작거나 같으면 `true`
 * @example
 *
 * _.lte(1, 3);
 * // => true
 *
 * _.lte(3, 3);
 * // => true
 *
 * _.lte(3, 1);
 * // => false
 */
export function lte(a: number, b: number) {
  return a <= b;
}
