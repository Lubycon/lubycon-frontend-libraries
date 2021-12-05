import assert from 'assert';
import zip from '../src/zip';

describe('zip', () => {
  it('zip 함수는 인자로 받은 배열의 같은 인덱스에 있는 원소를 그룹핑할 수 있다.', function () {
    assert.deepStrictEqual(zip(['a', 'b'], [1, 2], [true, false]), [
      ['a', 1, true],
      ['b', 2, false],
    ]);
  });
  it('zip 함수는 인자로 받은 배열 중 가장 긴 배열을 기준으로 순회를 돈다.', function () {
    assert.deepStrictEqual(zip(['a', 'b', 'foo'], [1, 2], [true, false]), [
      ['a', 1, true],
      ['b', 2, false],
      ['foo', undefined, undefined],
    ]);
    assert.deepStrictEqual(zip(['a', 'b'], [1, 2, 100], [true, false]), [
      ['a', 1, true],
      ['b', 2, false],
      [undefined, 100, undefined],
    ]);
  });
});
