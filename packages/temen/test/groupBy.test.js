import assert from 'assert';
import { groupBy } from '../src/groupBy';

describe('groupBy', () => {
  it('groupBy 함수는 두 번째 인자로 주어진 이터레이터의 반환값을 기준으로 값을 그룹핑할 수 있다', function () {
    assert.deepStrictEqual(groupBy([6.1, 4.2, 6.3], Math.floor), { 4: [4.2], 6: [6.1, 6.3] });
  });
  it('groupBy 함수는 두 번째 인자로 주어진 이터레이터의 반환값을 기준으로 값을 그룹핑할 수 있다', function () {
    assert.deepStrictEqual(
      groupBy([6.1, 4.2, 6.3], (item) => `key_${Math.floor(item)}`),
      { key_4: [4.2], key_6: [6.1, 6.3] }
    );
  });
  it('groupBy 함수는 두 번째 인자로 주어진 이터레이터의 반환값을 기준으로 값을 그룹핑할 수 있다', function () {
    assert.deepStrictEqual(
      groupBy(
        [
          { age: 31, name: 'evan' },
          { age: 32, name: 'john' },
          { age: 25, name: 'kevin' },
          { age: 44, name: 'react' },
          { age: 41, name: 'java' },
        ],
        ({ age }) => `${Math.floor(age / 10) * 10}대`
      ),
      {
        '20대': [{ age: 25, name: 'kevin' }],
        '30대': [
          { age: 31, name: 'evan' },
          { age: 32, name: 'john' },
        ],
        '40대': [
          { age: 44, name: 'react' },
          { age: 41, name: 'java' },
        ],
      }
    );
  });
});
