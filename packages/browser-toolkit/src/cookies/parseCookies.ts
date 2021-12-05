export function parseCookies(cookieString: string): Record<string, string> {
  const arr = cookieString.split(';');
  return arr.reduce((prev, current) => {
    const [key, value] = current.split('=');
    return {
      ...prev,
      [key.trim()]: value,
    };
  }, {});
}
