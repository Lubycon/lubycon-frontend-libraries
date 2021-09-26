import { isBoolean, isNumber, isString } from '../src/is/index';

test('check if value is string type', () => {
  expect(isString('test')).toBe(true);
  expect(isString(1000)).toBe(false);
  expect(isString(true)).toBe(false);
});

test('check if value is number type', () => {
  expect(isNumber('test')).toBe(false);
  expect(isNumber(1000)).toBe(true);
  expect(isNumber(true)).toBe(false);
});

test('check if value is boolean type', () => {
  expect(isBoolean('test')).toBe(false);
  expect(isBoolean(1000)).toBe(false);
  expect(isBoolean(true)).toBe(true);
});
