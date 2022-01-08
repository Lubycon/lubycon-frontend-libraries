export function convertFirstLetter(text: string, formatter: (char: string) => string) {
  if (text.length === 0) {
    return text;
  }

  const [first, ...rest] = text;
  return `${formatter(first)}${rest.join('')}`;
}
