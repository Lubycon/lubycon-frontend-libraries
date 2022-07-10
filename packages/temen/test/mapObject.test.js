import { mapKeys, mapValues } from '../src';

describe('mapKeys, mapValues', () => {
  test('mapKeys 함수는 "object"와 동일한 값을 가진 객체를 만들고 "iterate"를 통해 "object"의 각 열거형 문자열 키 속성을 이용해 새로운 생성된 키를 생성한다.', () => {
    expect(mapKeys({ a: 1, b: 2 }, (value, key) => key + value)).toStrictEqual({ a1: 1, b2: 2 });
  });

  test('mapValues "object"와 동일한 키를 가진 객체를 만들고 "object"의 각 열거형 문자열 키 속성을 이용해 iterate는 세 가지 인수(value, key, object)로 호출된다.', () => {
    expect(
      mapValues(
        {
          fred: { user: 'fred', age: 40 },
          pebbles: { user: 'pebbles', age: 1 },
        },
        (o) => o.age
      )
    ).toStrictEqual({ fred: 40, pebbles: 1 });
  });
});
