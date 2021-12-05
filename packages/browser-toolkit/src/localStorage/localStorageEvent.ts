export interface LocalStorageEventPayload<T> {
  key: string;
  data: T;
}

export function createLocalStorageChangeEvent<T>(payload: LocalStorageEventPayload<T>) {
  return new CustomEvent('onLocalStorageChange', { detail: payload });
}
createLocalStorageChangeEvent.eventName = 'onLocalStorageChange';

export function isTypeOflocalStorageChangeEvent<T>(
  evt: any
): evt is CustomEvent<LocalStorageEventPayload<T>> {
  return !!evt && evt.type === createLocalStorageChangeEvent.eventName;
}
