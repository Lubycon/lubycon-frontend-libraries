import assert from 'assert';
import unzip from '../src/unzip';

describe('unzip', () => {
  it('unzip 함수는 zip된 배열을 다시 unzip 한다.', function () {
    assert.deepStrictEqual(
      unzip([
        ['a', 1, true],
        ['b', 2, false],
      ]),
      [
        ['a', 'b'],
        [1, 2],
        [true, false],
      ]
    );
  });

  it('쌍이 없는 원소가 존재할 경우 해당 인덱스에는 undefined가 들어간다', function () {
    assert.deepStrictEqual(
      unzip([
        ['a', 1, true, 2],
        ['b', 2, false],
      ]),
      [
        ['a', 'b'],
        [1, 2],
        [true, false],
        [2, undefined],
      ]
    );
  });
});
