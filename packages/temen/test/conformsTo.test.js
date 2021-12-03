import conformsTo from '../src/conformsTo';

describe('conformsTo', () => {
  const foo = {
    a: 123,
    b: '123',
  };
  const bar = {
    a: {
      b: 123,
    },
    b: '123',
  };

  test('conformsTo 함수는 첫번째 인자로 받은 오브젝트를 두번째 인자로 받은 함수로 검증합니다.', () => {
    expect(
      conformsTo(foo, {
        a: (value) => typeof value === 'number',
        b: (value) => typeof value === 'string',
      })
    ).toBe(true);
  });

  it('conformsTo 함수는 첫번째 인자로 받은 오브젝트의 깊이가 1이 아니면 false를 반환합니다. ', function () {
    expect(
      conformsTo(bar, {
        a: (value) => typeof value === 'object',
        b: (value) => typeof value === 'number',
      })
    ).toBe(false);
  });
});
