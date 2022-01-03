import assert from 'assert';
import { flatten, flattenDeep } from '../src/flatten';

describe('flatten', () => {
  test('flatten은 인자로 받은 배열을 1 Depth Flatten 한다', () => {
    assert.deepStrictEqual(
      flatten([
        [
          [1, 23],
          [true, true],
        ],
        ['ab'],
        [1, 2],
      ]),
      [[1, 23], [true, true], 'ab', 1, 2]
    );
    assert.deepStrictEqual(
      flatten([
        [1, 2],
        ['hello', 'world', [30]],
      ]),
      [1, 2, 'hello', 'world', [30]]
    );
  });

  test('flatten은 두 번째 인자인 Depth만큼 재귀 Flatten을 수행한다', () => {
    assert.deepStrictEqual(
      flatten(
        [
          [
            [1, 23],
            [true, true],
          ],
          ['ab'],
          [1, 2],
        ],
        2
      ),
      [1, 23, true, true, 'ab', 1, 2]
    );
  });

  test('flatten은 두 번째 인자인 Depth에 -1을 넘기면 배열을 Flatten 하지 않는다', () => {
    assert.deepStrictEqual(
      flatten(
        [
          [
            [1, 23],
            [true, true],
          ],
          ['ab'],
          [1, 2],
        ],
        -1
      ),
      [
        [
          [1, 23],
          [true, true],
        ],
        ['ab'],
        [1, 2],
      ]
    );
  });
});

describe('flattenDeep', () => {
  test('flattenDeep은 배열의 깊이를 끝까지 탐색하여 재귀 Flatten을 수행한다', () => {
    assert.deepStrictEqual(
      flattenDeep([
        [
          [1, 23],
          [true, true, [{ test: 1 }]],
        ],
        ['ab'],
        [1, 2],
      ]),
      [1, 23, true, true, { test: 1 }, 'ab', 1, 2]
    );
    assert.deepStrictEqual(
      flattenDeep([
        [1, 2, [3, [true]]],
        ['hello', 'world', [30]],
      ]),
      [1, 2, 3, true, 'hello', 'world', 30]
    );
  });
});
