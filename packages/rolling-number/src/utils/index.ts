export const formatDigit = ({
  number,
  length,
  divider,
}: {
  number: number;
  length?: number;
  divider: string;
}) => {
  const stringified = String(number);
  const inputLength = stringified.length;
  const fullLength = Math.max(length ?? 0, inputLength);

  const arr = stringified.padStart(fullLength, '0').split('').reverse();
  for (let i = arr.length - 1; i > 0; i--) {
    if (i % 3 === 0) {
      arr.splice(i, 0, divider);
    }
  }

  return arr;
};

const _getArr = (a: number, b: number) => new Array(b - a + 1).fill(0).map((_, index) => a + index);
export const getArr = (x: number, y: number) => {
  const a = Math.floor(x);
  const b = Math.floor(y);

  if (a === b) {
    return [a];
  }
  if (a < b) {
    return _getArr(a, b);
  }
  if (a >= b) {
    return [..._getArr(a, 9), ..._getArr(0, b)];
  }

  return [];
};
