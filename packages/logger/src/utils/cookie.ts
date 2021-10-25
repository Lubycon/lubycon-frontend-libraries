export function setCookie(name: string, value: any, minutes: number) {
  let expires;
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  } else {
    expires = '';
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

export function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie) {
    const array = document.cookie.split(escape(name) + '=');
    if (array.length >= 2) {
      const arraySub = array[1].split(';');
      cookieValue = unescape(arraySub[0]);
    }
  }
  return cookieValue;
}
