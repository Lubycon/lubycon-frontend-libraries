import { trimCharacters } from '../trimCharacters';
import { upperFirstLetter } from '../convertFirstLetter';

export function splitByUpperCase(text: string, splitter: string[]) {
  if (text === '') {
    return text;
  }

  const escapeSplitter = splitter.map((c) => (c === ' ' ? '\\s' : c));

  const regex = new RegExp(`[${escapeSplitter.join('')}]|(?=[A-Z][a-z])`);
  const words = trimCharacters(text, escapeSplitter).split(regex);
  return words
    .map((word, index) => {
      const [firstCharacter, ...rest] = word;
      const lowerRest = rest.join('').toLowerCase();
      return index === 0 ? `${firstCharacter}${lowerRest}` : upperFirstLetter(word.toLowerCase());
    })
    .join('');
}
