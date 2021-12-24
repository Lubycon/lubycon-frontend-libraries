import { gt, gte } from '../src';

describe('deepClone', () => {
  test('gt 함수는 value가 other보다 크면 true, 아니면 false를 반환한다.', () => {
    expect(gt(1, 2)).toBe(false);
    expect(gt(2, 1)).toBe(true);
    expect(gt(2, 2)).toBe(false);
  });

  test('gte 함수는 value가 other보다 크거나 같으면 true, 아니면 false를 반환한다.', () => {
    expect(gte(1, 2)).toBe(false);
    expect(gte(2, 1)).toBe(true);
    expect(gte(2, 2)).toBe(true);
  });
});
