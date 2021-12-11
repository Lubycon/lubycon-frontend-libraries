import { isEqual } from '../src/isEqual';

const generateMap = (object) => {
  const map = new Map();
  for (const [key, value] of Object.entries(object)) {
    map.set(key, value);
  }
  return map;
};

describe('isEqual', () => {
  test('isEqual는 원시자료형을 비교할 수 있다', () => {
    expect(isEqual('foo', 'foo')).toBe(true);
    expect(isEqual('foo', 'a')).toBe(false);
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(1, 10)).toBe(false);
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(-0, 0)).toBe(false);
  });
  test('isEqual는 배열을 비교할 수 있다', () => {
    expect(isEqual([1], [1])).toBe(true);
    expect(isEqual([2], [1])).toBe(false);
    expect(isEqual([1, 2], [1])).toBe(false);
    expect(isEqual([], [])).toBe(true);
  });
  test('isEqual는 Date를 비교할 수 있다', () => {
    expect(isEqual(new Date('2021-11-25'), new Date('2021-11-25'))).toBe(true);
    expect(isEqual(new Date('2021-11-25'), new Date('2021-11-26'))).toBe(false);
  });
  test('isEqual는 TypedArray를 비교할 수 있다', () => {
    expect(isEqual(new Float32Array([1, 2, 3]), new Float32Array([1, 2, 3]))).toBe(true);
    expect(isEqual(new Float32Array([1, 2, 3]), new Float32Array([1, 2]))).toBe(false);
    expect(isEqual(new Float32Array([1, 2, 3]), new Int8Array([1, 2]))).toBe(false);
  });
  test('isEqual는 Map과 Set을 비교할 수 있다', () => {
    expect(
      isEqual(generateMap({ name: 'evan', age: 31 }), generateMap({ name: 'evan', age: 31 }))
    ).toBe(true);
    expect(
      isEqual(generateMap({ name: 'evan', age: 31 }), generateMap({ name: 'evan', age: 12 }))
    ).toBe(false);
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2]))).toBe(false);
  });
  test('isEqual는 객체를 비교할 수 있다', () => {
    expect(isEqual({ name: 'evan' }, { name: 'evan' })).toBe(true);
    expect(isEqual({ name: 'evan' }, { name: 'john' })).toBe(false);
    expect(isEqual({ name: 'evan' }, { age: 'evan' })).toBe(false);
    expect(isEqual({ name: 'evan' }, { age: 31 })).toBe(false);
  });
  test('isEqual는 객체를 깊은 비교할 수 있다', () => {
    expect(
      isEqual(
        { name: 'evan', org: { name: 'lubycon' } },
        { name: 'evan', org: { name: 'lubycon' } }
      )
    ).toBe(true);
    expect(
      isEqual({ name: 'evan', org: { name: 'lubycon' } }, { name: 'evan', org: { name: 'toss' } })
    ).toBe(false);
    expect(
      isEqual(
        { name: 'evan', job: ['frontend', 'developer'] },
        { name: 'evan', job: ['frontend', 'developer'] }
      )
    ).toBe(true);
    expect(
      isEqual(
        { name: 'evan', job: ['frontend', 'developer'] },
        { name: 'evan', job: ['sound engineer', 'bboy'] }
      )
    ).toBe(false);
  });
});
