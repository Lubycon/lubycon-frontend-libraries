import { trimCharacters, trimStartCharacters, trimEndCharacters } from '../src';

describe('trimStartCharacters', () => {
  test('trimStartCharacters 함수는 인자로 받은 문자열 내에서 지정한 문자를 Start Trim한다', () => {
    expect(trimStartCharacters('    foo')).toBe('foo');
    expect(trimStartCharacters('--foo', ['-'])).toBe('foo');
  });
});

describe('trimEndCharacters', () => {
  test('trimEndCharacters 함수는 인자로 받은 문자열 내에서 지정한 문자를 End Trim한다', () => {
    expect(trimEndCharacters('foo    ')).toBe('foo');
    expect(trimEndCharacters('foo--', ['-'])).toBe('foo');
  });
});

describe('trimCharacters', () => {
  test('trimCharacters 함수는 인자로 받은 문자열 내에서 지정한 문자를 Trim한다', () => {
    expect(trimCharacters('   foo    ')).toBe('foo');
    expect(trimCharacters('--foo--', ['-'])).toBe('foo');
    expect(trimCharacters('--_foo-_-', ['-', '_'])).toBe('foo');
    expect(trimCharacters('-_-foo-_-', ['-_-'])).toBe('foo');
  });
});
