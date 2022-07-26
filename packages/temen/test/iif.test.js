import { iif } from '../src/iif';

describe('iif', () => {
  test('iif 함수는 첫 번째 인자의 결과가 참일 경우 반드시 두 번째 인자를 반환한다', () => {
    expect(iif(true, 1)).toBe(1);
    expect(iif(true, 1, 2)).toBe(1);
  });

  test('iif 함수는 첫 번째 인자의 결과가 거짓일 경우 반드시 세 번째 인자를 반환한다.', () => {
    expect(iif(false, 1, 2)).toBe(2);
    expect(iif(false, 1, 'foo')).toBe('foo');
  });

  test('iif 함수는 첫 번째 인자의 결과가 거짓이지만 세 번째 인자가 없는 경우에는 undefined를 반환한다.', () => {
    expect(iif(false, 1)).toBe(undefined);
  });
});
