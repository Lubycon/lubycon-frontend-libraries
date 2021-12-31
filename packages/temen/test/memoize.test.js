import assert from 'assert';
import memoize from '../src/memoize';

describe('memoize', () => {
  it('같은 레퍼런스나 값을 가진 인자를 받으면 메모아이징된 값을 반환한다', function () {
    const foo = { a: 1, b: 2 };
    const func = memoize((value) => Object.values(value));

    assert.deepStrictEqual(func(foo), [1, 2]);
    foo.a = 2;
    assert.deepStrictEqual(func(foo), [1, 2]);
  });
  it('캐시를 임의로 비운다면 갱신된 값을 반환한다', function () {
    const foo = { a: 1, b: 2 };
    const func = memoize((value) => Object.values(value));

    assert.deepStrictEqual(func(foo), [1, 2]);
    func.cache.delete(foo);
    foo.a = 2;
    assert.deepStrictEqual(func(foo), [2, 2]);
  });
});
