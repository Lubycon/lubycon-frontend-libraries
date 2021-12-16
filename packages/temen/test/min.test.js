import assert from 'assert';
import { min, minBy } from '../src/min';

describe('min', () => {
  it('min 함수는 인자로 받은 배열의 모든 원소 중 최소값을 반환한다', function () {
    expect(min([1, 2, 3, 4])).toBe(1);
  });
});

describe('minBy', () => {
  it('minBy 함수는 인자로 받은 배열을 mapping한 후 최소 값을 가진 원소를 반환한다', function () {
    assert.deepStrictEqual(
      minBy([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], (item) => item.value),
      { value: 1 }
    );
    assert.deepStrictEqual(
      minBy([{ name: 'evan-moon' }, { name: 'john' }], (item) => item.name.length),
      { name: 'john' }
    );
  });
});
