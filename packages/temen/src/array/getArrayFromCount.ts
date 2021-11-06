/**
 * 인자로 받은 숫자만큼의 길이를 가진 배열을 반환합니다. 두 번째 인자의 mapper를 넘기지 않으면, 인덱스를 원소 값으로 가집니다.
 *
 * @example
 * getArrayFromCount(5) // [0, 1, 2, 3, 4];
 * getArrayFromCount(5, i => `${i}!`); // ['0!', '1!', '2!', '3!', '4!']
 */
export default function getArrayFromCount<T>(count: number, mapper?: (i: number) => T) {
  return Array.from({ length: count }, (_, i) => mapper?.(i) ?? i);
}
