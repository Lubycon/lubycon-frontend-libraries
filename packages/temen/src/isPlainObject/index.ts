/**
 * value가 plane object 인지 확인합니다.
 * (e.g. `Object` 생성자로부터 생성된 오브젝트, `[[Prototype]]`이 `null`인 오브젝트)
 *
 * @param {any} value - 확인할 값
 * @returns {boolean} 만약 value가 plane object라면 `true`를, 그렇지 않다면 `false`를 반환합니다.
 * @example
 * ```js
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * isPlainObject(new Foo);
 * // => false
 *
 * isPlainObject([1, 2, 3]);
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * isPlainObject(Object.create(null));
 * // => true
 * ```
 */

function isPlainObject(obj: any) {
  return typeof obj === 'object' && (obj.constructor === Object || obj.constructor === undefined);
}

export default isPlainObject;
