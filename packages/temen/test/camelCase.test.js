import { camelCase } from '../src';

describe('camelCase', () => {
  test('camelCase는 인자로 받은 문자열을 Camel Case로 변경한다', () => {
    expect(camelCase('camelCase')).toBe('camelCase');
    expect(camelCase('123CamelCase')).toBe('123CamelCase');
    expect(camelCase('Hello World')).toBe('helloWorld');
    expect(camelCase('snake_case')).toBe('snakeCase');
    expect(camelCase('kebab-case')).toBe('kebabCase');
    expect(camelCase('123-kebab-case')).toBe('123KebabCase');
    expect(camelCase('--FOO-bar--')).toBe('fooBar');
    expect(camelCase('__Init__')).toBe('init');
    expect(camelCase('HELLO_WORLD')).toBe('helloWorld');
    expect(camelCase('')).toBe('');
  });
  test('camelCase는 두 번째 인자에 받은 문자열 리스트를 Splitter로 인식한다', () => {
    expect(camelCase('foo&bar', ['&'])).toBe('fooBar');
    expect(camelCase('foo&bar-baz', ['&', '-'])).toBe('fooBarBaz');
  });
});
