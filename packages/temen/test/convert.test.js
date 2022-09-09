import { convert } from '../src/convert';

describe('convert', () => {
  test('convert 함수는 첫 번째 인자가 nullish 값이 아니라면 formatter 함수의 결과를 반환한다', () => {
    expect(convert(1, (v) => String(v))).toBe('1');
    expect(convert('fred', (v) => v.toUpperCase())).toBe('FRED');
  });

  test('convert 함수는 첫 번째 인자가 nullish 값이라면 인자를 그대로 반환한다', () => {
    expect(convert(null, (v) => String(v))).toBe(null);
    expect(convert(undefined, (v) => v.toUpperCase())).toBe(undefined);
  });
});
