/**
 *
 * value가 오브젝트의 [언어타입](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)인지 확인합니다.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @param {any} value - 확인할 값
 * @returns {boolean} 만약 value가 오브젝트이면 `true`를, 그렇지 않다면 `false`를 반환합니다.
 * @example
 * ```js
 * isObject({});
 * // => true
 *
 * isObject([1, 2, 3]);
 * // => true
 *
 * isObject(null);
 * // => false
 * ```
 */

function isObject(value: any) {
  return value !== null && typeof value === 'object';
}

export default isObject;
