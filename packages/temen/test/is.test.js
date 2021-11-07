import { isBoolean, isNumber, isString, isNil } from '../src/is/index';

describe('is', () => {
  test('isString 함수는 string 타입을 인자로 받으면 true, 아니면 false를 반환한다', () => {
    expect(isString('test')).toBe(true);
    expect(isString(1000)).toBe(false);
    expect(isString(true)).toBe(false);
  });

  test('isNumber 함수는 number 타입을 인자로 받으면 true, 아니면 false를 반환한다', () => {
    expect(isNumber('test')).toBe(false);
    expect(isNumber(1000)).toBe(true);
    expect(isNumber(true)).toBe(false);
  });

  test('isBoolean 함수는 boolean 타입을 인자로 받으면 true, 아니면 false를 반환한다', () => {
    expect(isBoolean('test')).toBe(false);
    expect(isBoolean(1000)).toBe(false);
    expect(isBoolean(true)).toBe(true);
  });
});

describe('isNil 함수는 value가 null 또는 undefined 인지 확인합니다.', () => {
  test(`isNil은 value가 null이면 true 를 반환한다. `, () => {
    expect(isNil(null)).toBeTruthy();
  });
  test(`isNil은 value가 (void 0)이면 true 를 반환한다.`, () => {
    expect(isNil(void 0)).toBeTruthy();
  });

  test(`isNil은 value가 NaN이면 false 를 반환한다.`, () => {
    expect(isNil(NaN)).toBeFalsy();
  });
  test(`isNil은 value가 ''이면 false 를 반환한다.`, () => {
    expect(isNil('')).toBeFalsy();
  });
  test(`isNil은 value가 undefined 이면 true 를 반환한다.`, () => {
    expect(isNil(undefined)).toBeTruthy;
  });
});
