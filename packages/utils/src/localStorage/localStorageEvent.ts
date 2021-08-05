export interface LocalStorageEventPayload<T> {
  key: string;
  data: T;
}

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
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent(
      typeArg,
      params?.bubbles ?? false,
      params?.cancelable ?? false,
      params?.detail
    );
    return event;
  }

  window.CustomEvent = CustomEvent as unknown as typeof window.CustomEvent;
})();

export class LocalStorageChangeEvent<T> extends CustomEvent<LocalStorageEventPayload<T>> {
  static eventName = 'onLocalStorageChange';

  constructor(payload: LocalStorageEventPayload<T>) {
    super(LocalStorageChangeEvent.eventName, { detail: payload });
  }
}
