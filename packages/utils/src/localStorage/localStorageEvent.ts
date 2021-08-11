export interface LocalStorageEventPayload<T> {
  key: string;
  data: T;
}

export function localStorageChangeEvent<T>(payload: LocalStorageEventPayload<T>) {
  return new CustomEvent('onLocalStorageChange', { detail: payload });
}
localStorageChangeEvent.eventName = 'onLocalStorageChange';
