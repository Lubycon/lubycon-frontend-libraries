/**
 * CustomEvent polyfill 적용: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
(() => {
  if (typeof window === 'undefined') {
    window = {} as unknown as Window & typeof globalThis;
  }

  if (typeof window.CustomEvent === 'function') {
    return;
  }

  function CustomEvent<T>(
    typeArg: string,
    params: CustomEventInit<T> = { bubbles: false, cancelable: false }
  ): CustomEvent<T> {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
      typeArg,
      params?.bubbles ?? false,
      params?.cancelable ?? false,
      params?.detail
    );
    return evt;
  }

  window.CustomEvent = CustomEvent as unknown as typeof window.CustomEvent;
})();

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
