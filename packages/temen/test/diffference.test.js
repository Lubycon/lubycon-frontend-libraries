import assert from 'assert';
import { differenceWith, difference } from '../src/difference';

describe('differenceWith', () => {
  it('differenceWith 함수는 인자로 받은 두 배열의 차이를 반환할 수 있다. (원시 타입)', function () {
    assert.deepStrictEqual(
      differenceWith([0, 1, 2, 3, 4, 5], [0, 1, 2], (x, y) => x === y),
      [3, 4, 5]
    );
  });
  it('differenceWith 함수는 인자로 받은 두 배열의 차이를 반환할 수 있다. (null, undefined)', function () {
    assert.deepStrictEqual(
      differenceWith([null, undefined], [null], (x, y) => x === y),
      [undefined]
    );
  });
  it('differenceWith 함수는 인자로 받은 두 배열의 차이를 반환할 수 있다. (복잡한 타입)', function () {
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
  it('differenceWith 함수는 같은 배열이 들어오면 빈 배열을 반환한다.', function () {
    assert.deepStrictEqual(
      differenceWith([{ foo: 1 }], [{ foo: 1 }], (x, y) => x.foo === y.foo),
      []
    );
  });
});

describe('difference', () => {
  it('difference 함수는 인자로 받은 두 배열의 차이를 반환할 수 있다. (원시 타입)', function () {
    assert.deepStrictEqual(difference([0, 1, 2, 3, 4, 5], [0, 1, 2]), [3, 4, 5]);
  });
  it('difference 함수는 인자로 받은 두 배열의 차이를 반환할 수 있다. (null, undefined)', function () {
    assert.deepStrictEqual(difference([null, undefined], [null]), [undefined]);
  });
  it('difference 함수는 인자로 받은 두 배열의 차이를 반환할 수 있다. (복잡한 타입)', function () {
    assert.deepStrictEqual(
      difference(
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
  it('difference 함수는 인자로 받은 두 배열의 깊은 차이를 반환할 수 있다.', function () {
    assert.deepStrictEqual(
      difference(
        [
          { name: 'evan', org: { name: 'toss' } },
          { name: 'john', org: { name: 'github' } },
        ],
        [
          { name: 'evan', org: { name: 'toss' } },
          { name: 'john', org: { name: 'google' } },
        ]
      ),
      [{ name: 'john', org: { name: 'github' } }]
    );
  });
  it('difference 함수는 같은 배열이 들어오면 빈 배열을 반환한다.', function () {
    assert.deepStrictEqual(difference([{ foo: 1 }], [{ foo: 1 }]), []);
  });
});
