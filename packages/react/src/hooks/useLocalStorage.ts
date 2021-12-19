import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  LocalStorageEventPayload,
  createLocalStorageChangeEvent,
} from 'browser-toolkit';

import { useEffect, useState, useCallback } from 'react';

function tryParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function isTypeOflocalStorageChangeEvent<T>(
  evt: any
): evt is CustomEvent<LocalStorageEventPayload<T>> {
  return Boolean(evt) && evt.type === createLocalStorageChangeEvent.eventName;
}

export type LocalStorageNullableReturnValue<T> = [
  T | null,
  (newValue: T | null) => void,
  () => void
];
export type LocalStorageReturnValue<T> = [T, (newValue: T | null) => void, () => void];

function useLocalStorage<T = string>(key: string): LocalStorageNullableReturnValue<T>;
function useLocalStorage<T = string>(key: string, defaultValue: T): LocalStorageReturnValue<T>;
function useLocalStorage<T = string>(key: string, defaultValue: T | null = null) {
  const [localState, setLocalState] = useState<T | null>(getLocalStorageItem(key));

  const onLocalStorageChange = (event: CustomEvent<LocalStorageEventPayload<T>> | StorageEvent) => {
    if (isTypeOflocalStorageChangeEvent<T>(event)) {
      if (event.detail.key === key) {
        setLocalState(event.detail.data);
      }
    } else {
      if (event.key === key) {
        setLocalState(event.newValue === null ? null : tryParse(event.newValue));
      }
    }
  };

  useEffect(() => {
    const listener = (e: Event) =>
      onLocalStorageChange(e as CustomEvent<LocalStorageEventPayload<T>>);

    window.addEventListener(createLocalStorageChangeEvent.eventName, listener);
    window.addEventListener('storage', listener);

    if (localStorage.getItem(key) === null && defaultValue !== null) {
      setLocalStorageItem(key, defaultValue);
    }

    return () => {
      window.removeEventListener(createLocalStorageChangeEvent.eventName, listener);
      window.removeEventListener('storage', listener);
    };
  }, [key]);

  const writeState = useCallback((value: T | null) => setLocalStorageItem(key, value), [key]);
  const deleteState = useCallback(() => removeLocalStorageItem(key), [key]);
  const state: T | null = localState ?? defaultValue;

  return [state, writeState, deleteState];
}

export default useLocalStorage;
