export interface LocalStorageEventPayload<T> {
  key: string;
  data: T;
}

export class LocalStorageChangeEvent<T> extends CustomEvent<LocalStorageEventPayload<T>> {
  static eventName = 'onLocalStorageChange';

  constructor(payload: LocalStorageEventPayload<T>) {
    super(LocalStorageChangeEvent.eventName, { detail: payload });
  }
}
