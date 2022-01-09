import { parscalCase } from '../src';

describe('parscalCase', () => {
  test('parscalCase는 인자로 받은 문자열을 Parscal Case로 변경한다', () => {
    expect(parscalCase('camelCase')).toBe('CamelCase');
    expect(parscalCase('123CamelCase')).toBe('123CamelCase');
    expect(parscalCase('Hello World')).toBe('HelloWorld');
    expect(parscalCase('snake_case')).toBe('SnakeCase');
    expect(parscalCase('kebab-case')).toBe('KebabCase');
    expect(parscalCase('123-kebab-case')).toBe('123KebabCase');
    expect(parscalCase('--FOO-bar--')).toBe('FooBar');
    expect(parscalCase('__Init__')).toBe('Init');
    expect(parscalCase('HELLO_WORLD')).toBe('HelloWorld');
    expect(parscalCase('')).toBe('');
  });
  test('parscalCase는 두 번째 인자에 받은 문자열 리스트를 Splitter로 인식한다', () => {
    expect(parscalCase('foo&bar', ['&'])).toBe('FooBar');
    expect(parscalCase('foo&bar-baz', ['&', '-'])).toBe('FooBarBaz');
  });
});
