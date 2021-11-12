import assert from 'assert';
import { differenceWith } from '../src/difference';

describe('differenceWith', () => {
  it('differenceWith 함수는 인자로 받은 두 배열의 차이를 반환할 수 있다.', function () {
    assert.deepStrictEqual(
      differenceWith([0, 1, 2, 3, 4, 5], [0, 1, 2], (x, y) => x === y),
      [3, 4, 5]
    );
  });
  it('differenceWith 함수는 인자로 받은 두 배열의 차이를 반환할 수 있다.', function () {
    assert.deepStrictEqual(
      differenceWith(
        [
          { info: { id: 1 }, name: 'evan' },
          { info: { id: 2 }, name: 'john' },
        ],
        [{ info: { id: 2 }, name: 'john' }],
        (x, y) => x.info.id === y.info.id
      ),
      [{ info: { id: 1 }, name: 'evan' }]
    );
  });
});
