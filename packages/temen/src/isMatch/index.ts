/**
 * 'object'에 `source`가 존재하는지 깊은 비교하여 결과를 반환합니다.
 *
 *
 * @param {Object} object 검사할 객체
 * @param {Object} source 프로퍼티 값을 비교할 객체
 * @returns {boolean} `object`에 `source`가 존재하면 `true` 아니면 `false`
 * @example
 *```js
 * const object = { 'a': 1, 'b': 2 };
 *
 * isMatch(object, { 'b': 2 });
 * // => true
 *
 * isMatch(object, { 'b': 1 });
 * // => false
 */

function isMatch(object: { [key: string]: any }, source: { [key: string]: any }) {
  Object.keys(source).forEach((key) => {
    if (!(key in object)) {
      return false;
    }

    if (typeof source[key] === 'object') {
      if (!isMatch(object[key], source[key])) {
        return false;
      }
    } else if (object[key] !== source[key]) {
      return false;
    }
  });

  return true;
}

export default isMatch;
