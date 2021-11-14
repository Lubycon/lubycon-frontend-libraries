import { isEqual } from '../src/isEqual';

describe('isEqual', () => {
  test('isEqual는 원시자료형을 비교할 수 있다', () => {
    expect(isEqual('foo', 'foo')).toBe(true);
    expect(isEqual('foo', 'a')).toBe(false);
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(1, 10)).toBe(false);
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(-0, 0)).toBe(false);
  });
  test('isEqual는 복잡한 자료형을 비교할 수 있다', () => {});
});
