/**
 * 대상 문자열 중 targetCharacters에 포함되는 문자를 Start Trim합니다. targetCharacters에 아무런 값을 주지 않는 경우에는 공백을 Trim 합니다.
 *
 * @example
 * ```ts
 * trimStartCharacters('    foo'); // foo
 * trimStartCharacters('--foo', ['-']); // foo
 * ```
 */
export function trimStartCharacters(text: string, targetCharacters: string[] = [' ']) {
  const char = targetCharacters.join('');
  const regex = `^[${char}]+`;
  return text.replace(new RegExp(regex), '');
}

/**
 * 대상 문자열 중 targetCharacters에 포함되는 문자를 End Trim합니다. targetCharacters에 아무런 값을 주지 않는 경우에는 공백을 Trim 합니다.
 *
 * @example
 * ```ts
 * trimEndCharacters('foo    '); // foo
 * trimEndCharacters('foo--', ['-']); // foo
 * ```
 */
export function trimEndCharacters(text: string, targetCharacters: string[] = [' ']) {
  const char = targetCharacters.join('');
  const regex = `[${char}]+$`;
  return text.replace(new RegExp(regex), '');
}

/**
 * 대상 문자열 중 targetCharacters에 포함되는 문자를 Trim합니다. targetCharacters에 아무런 값을 주지 않는 경우에는 공백을 Trim 합니다.
 *
 * @example
 * ```ts
 * trimCharacters('   foo    '); // foo
 * trimCharacters('--foo--', ['-']); // foo
 * trimCharacters('--_foo-_-', ['-', '_']); // foo
 * ```
 */
export function trimCharacters(text: string, targetCharacters: string[]) {
  const startTrimmed = trimStartCharacters(text, targetCharacters);
  return trimEndCharacters(startTrimmed, targetCharacters);
}
