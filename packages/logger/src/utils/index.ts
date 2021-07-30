export function getKeys<T>(data: T): Array<keyof typeof data> {
  return Object.keys(data) as Array<keyof typeof data>;
}
