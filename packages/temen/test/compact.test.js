import assert from 'assert';
import compact from '../src/compact';

describe('compact', () => {
  it('compact 함수는 0을 걸러낸다.', function () {
    assert.deepStrictEqual(compact([0, 1, 2, 3]), [1, 2, 3]);
  });

  it('compact 함수는 undefined와 null을 걸러낸다.', function () {
    assert.deepStrictEqual(compact([undefined, null, 2, 3]), [2, 3]);
  });

  it('compact 함수는 NaN을 걸러낸다.', function () {
    assert.deepStrictEqual(compact([NaN, 2, 3]), [2, 3]);
  });

  it('compact 함수는 모든 Falsy Value를 걸러낸다.', function () {
    assert.deepStrictEqual(compact([1, NaN, '', null, undefined, 2, 3, false]), [1, 2, 3]);
  });
});
