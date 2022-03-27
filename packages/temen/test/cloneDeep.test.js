import deepClone from '../src/cloneDeep';

describe('deepClone', () => {
  const array = [0, 1, 2];
  const obj = { a: 1, b: { c: 2 } };
  const typedArray = new Int16Array(1);
  const date = new Date();
  const map = new Map([['foo', 1]]);
  const set = new Set().add('foo');
  const sym = Symbol(1);
  const regexp = /foo/;

  it('deepClone 함수는 인자로 받은 배열을 복사한다.', function () {
    expect(deepClone(array)).toStrictEqual(array);
    expect(deepClone(array)).not.toBe(array);
  });
  it('deepClone 함수는 인자로 받은 오브젝트를 복사한다.', function () {
    expect(deepClone(obj)).toStrictEqual(obj);
    expect(deepClone(obj)).not.toBe(obj);
  });
  it('deepClone 함수는 인자로 받은 TypedArray를 복사한다.', function () {
    expect(deepClone(typedArray)).toStrictEqual(typedArray);
    expect(deepClone(typedArray)).not.toBe(typedArray);
  });
  it('deepClone 함수는 인자로 받은 Date 객체를 복사한다.', function () {
    expect(deepClone(date)).toStrictEqual(date);
    expect(deepClone(date)).not.toBe(date);
  });
  it('deepClone 함수는 인자로 받은 Map 객체를 복사한다.', function () {
    expect(deepClone(map)).toStrictEqual(map);
    expect(deepClone(map)).not.toBe(map);
  });
  it('deepClone 함수는 인자로 받은 Set 객체를 복사한다.', function () {
    expect(deepClone(set)).toStrictEqual(set);
    expect(deepClone(set)).not.toBe(set);
  });
  it('deepClone 함수는 인자로 받은 Symbol 객체를 복사한다.', function () {
    expect(String(deepClone(sym))).toBe(String(sym));
    expect(deepClone(sym)).not.toBe(sym);
  });
  it('deepClone 함수는 인자로 받은 RegExp 객체를 복사한다.', function () {
    expect(deepClone(regexp)).not.toBe(regexp);
  });
});
