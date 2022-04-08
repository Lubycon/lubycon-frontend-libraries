import assert from 'assert';
import omit from '../src/omit';

describe('omit', () => {
  it('omit 함수는 객체에서 원하는 키를 제외하여 새로운 객체를 만들수 있다.', function () {
    const origin = { a: 1, b: '2', c: 3 };
    const omitted = omit({ a: 1, b: '2', c: 3 }, ['a', 'c']);

    assert.deepStrictEqual(omitted, { b: '2' });
    expect(origin).not.toBe(omitted);
  });
  it('omit 함수의 두 번째 인자로 아무런 키를 넘기지 않아도 새로운 객체가 반한된다', function () {
    const origin = { a: 1, b: '2', c: 3 };
    const omitted = omit({ a: 1, b: '2', c: 3 }, []);

    assert.deepStrictEqual(omitted, origin);
    expect(origin).not.toBe(omitted);
  });
});
