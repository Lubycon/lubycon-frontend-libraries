import assert from 'assert';
import { max, maxBy } from '../src/max';

describe('max', () => {
  it('max 함수는 인자로 받은 배열의 모든 원소 중 최대값을 반환한다', function () {
    expect(max([1, 2, 3, 4])).toBe(4);
  });
});

describe('maxBy', () => {
  it('maxBy 함수는 인자로 받은 배열을 mapping한 후 최대 값을 가진 원소를 반환한다', function () {
    assert.deepStrictEqual(
      maxBy([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }], (item) => item.value),
      { value: 4 }
    );
    assert.deepStrictEqual(
      maxBy([{ name: 'evan-moon' }, { name: 'john' }], (item) => item.name.length),
      { name: 'evan-moon' }
    );
  });
});
