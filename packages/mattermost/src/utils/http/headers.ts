export function convertHeadersToObject(headers: Headers) {
  const data: Record<string, string> = {};
  headers.forEach((value, key) => {
    data[key] = value;
  });

  return data;
}
