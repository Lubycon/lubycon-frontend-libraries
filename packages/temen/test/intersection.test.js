import assert from 'assert';
import { intersection, intersectionWith } from '../src/intersection';

describe('intersectionWith', () => {
  it('intersectionWith 함수는 인자로 받은 두 배열의 겹치는 부분만을 반환할 수 있다. (원시 타입)', function () {
    assert.deepStrictEqual(
      intersectionWith([0, 1, 2, 3, 4, 5], [0, 1, 2, 10], (x, y) => x === y),
      [0, 1, 2]
    );
  });
  it('intersectionWith 함수는 인자로 받은 두 배열의 겹치는 부분만을 반환할 수 있다. (null, undefined)', function () {
    assert.deepStrictEqual(
      intersectionWith([null, undefined], [null], (x, y) => x === y),
      [null]
    );
  });
  it('intersectionWith 함수는 인자로 받은 두 배열의 겹치는 부분만을 반환할 수 있다. (복잡한 타입)', function () {
    assert.deepStrictEqual(
      intersectionWith(
        [
          { info: { id: 1 }, name: 'evan' },
          { info: { id: 2 }, name: 'john' },
        ],
        [{ info: { id: 2 }, name: 'john' }],
        (x, y) => x.info.id === y.info.id
      ),
      [{ info: { id: 2 }, name: 'john' }]
    );
  });
  it('intersectionWith 함수는 겹치는 부분이 없는 배열을 받으면 빈 배열을 반환한다.', function () {
    assert.deepStrictEqual(
      intersectionWith([{ foo: 1 }], [{ foo: 2 }], (x, y) => x.foo === y.foo),
      []
    );
  });
});

describe('intersection', () => {
  it('intersection 함수는 인자로 받은 두 배열의 겹치는 부분만을 반환할 수 있다. (원시 타입)', function () {
    assert.deepStrictEqual(intersection([0, 1, 2, 3, 4, 5], [0, 1, 2, 10]), [0, 1, 2]);
  });
  it('intersection 함수는 인자로 받은 두 배열의 겹치는 부분만을 반환할 수 있다. (null, undefined)', function () {
    assert.deepStrictEqual(intersection([null, undefined], [null]), [null]);
  });
  it('intersection 함수는 인자로 받은 두 배열의 겹치는 부분만을 반환할 수 있다. (복잡한 타입)', function () {
    assert.deepStrictEqual(
      intersection(
        [
          { info: { id: 1 }, name: 'evan' },
          { info: { id: 2 }, name: 'john' },
        ],
        [{ info: { id: 2 }, name: 'john' }],
        (x, y) => x.info.id === y.info.id
      ),
      [{ info: { id: 2 }, name: 'john' }]
    );
  });
  it('intersection 함수는 인자로 받은 두 배열의 깊은 비교하여 동일한 부분만을 반환할 수 있다.', function () {
    assert.deepStrictEqual(
      intersection(
        [
          { name: 'evan', org: { name: 'toss' } },
          { name: 'john', org: { name: 'github' } },
        ],
        [
          { name: 'evan', org: { name: 'toss' } },
          { name: 'john', org: { name: 'google' } },
        ]
      ),
      [{ name: 'evan', org: { name: 'toss' } }]
    );
  });
  it('intersection 함수는 겹치는 부분이 없는 배열을 받으면 빈 배열을 반환한다.', function () {
    assert.deepStrictEqual(intersection([{ foo: 1 }], [{ foo: 10 }]), []);
  });
});
