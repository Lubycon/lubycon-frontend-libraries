/**
 *
 * 이 메서드는 `isEqual`와 동일하지만 `customizer`를 전달합니다.
 * `customizer`가 `undefined`를 반환하면 비교는 메서드에 의해 처리됩니다.
 * `customizer`는 최대 여섯 개의 인수를 전달합니다.
 * (objValue, othValue [, index|key, object, other, stack])
 *
 * @param {any} value 비교할 값
 * @param {any} other value와 비교할 값
 * @param {Function} [customizer] 비교 조건
 * @returns {boolean} Returns value가 other와 동일한지 여부
 * @example
 *
```ts
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value)
 * }
 *
 * function customizer(objValue, othValue) {
 *   if (isGreeting(objValue) && isGreeting(othValue)) {
 *     return true
 *   }
 * }
 *
 * const array = ['hello', 'goodbye']
 * const other = ['hi', 'goodbye']
 *
 * isEqualWith(array, other, customizer)
 * // => true
 * ```
 */

function isEqualWith<V, O>(value: V, other: O, customizer: (value: V, other: O) => any): boolean {
  return customizer(value, other);
}

export default isEqualWith;
