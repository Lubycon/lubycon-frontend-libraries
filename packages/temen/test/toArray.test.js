import toArray from '../src/toArray';

describe('toArray', () => {
  test('toArray 함수는 파라미터로 받은 값을 배열으로 변환합니다.', () => {
    expect(toArray(1)).toEqual([]);
    expect(toArray('abc')).toEqual(['a', 'b', 'c']);
    expect(toArray({ a: 1, b: 2 })).toEqual([1, 2]);
  });
});
