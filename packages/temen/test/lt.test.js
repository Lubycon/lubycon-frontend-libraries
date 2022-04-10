import { lt, lte } from '../src/lt';

describe('lt, lte', () => {
  test('lt 함수는 첫 번째 파라미터가 두 번째 파라미터 보다 작으면 `true`를 반환합니다.', () => {
    expect(lt(1, 2)).toBe(true);
    expect(lt(1, 1)).toBe(false);
    expect(lt(2, 1)).toBe(false);
  });

  test('lte 함수는 첫 번째 파라미터가 두 번째 파라미터 보다 같거나 작으면 `true`를 반환합니다.', () => {
    expect(lte(1, 2)).toBe(true);
    expect(lte(1, 1)).toBe(true);
    expect(lte(2, 1)).toBe(false);
  });
});
