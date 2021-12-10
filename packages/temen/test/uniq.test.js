import assert from 'assert';
import { uniq, uniqBy } from '../src/uniq';

describe('uniq', () => {
  it('uniq 함수는 배열 내에서 중복되는 값을 가진 원소를 제거한다', function () {
    assert.deepStrictEqual(uniq([1, 1, 2, 3, 5, 5, 7, 'foo', 'bar', 'bar']), [
      1,
      2,
      3,
      5,
      7,
      'foo',
      'bar',
    ]);
  });
  it('uniq 함수는 배열 내에서 중복되는 레퍼런스를 가진 원소를 제거한다', function () {
    const o = { id: 1 };
    assert.deepStrictEqual(uniq([o, o]), [{ id: 1 }]);
  });
});

describe('uniqBy', () => {
  it('uniqBy 함수는 배열의 원소들을 mapping한 후, 중복되는 값을 가진 원소를 제거한다', function () {
    assert.deepStrictEqual(
      uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor),
      [1, 2, 3, 5, 7]
    );
  });
});
