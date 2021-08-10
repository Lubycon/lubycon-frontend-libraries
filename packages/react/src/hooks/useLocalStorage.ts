import {
  setLocalStorageItem,
  removeLocalStorageItem,
  LocalStorageChangeEvent,
} from '@lubycon/utils';

import { useEffect, useState, useCallback } from 'react';

function tryParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function isTypeOfLocalStorageChangeEvent<TValue>(evt: any): evt is LocalStorageChangeEvent<TValue> {
  return !!evt && evt.type === LocalStorageChangeEvent.eventName;
}

export type LocalStorageNullableReturnValue<T> = [
  T | null,
  (newValue: T | null) => void,
  () => void
];
export type LocalStorageReturnValue<T> = [T, (newValue: T | null) => void, () => void];

export function useLocalStorage<T = string>(key: string): LocalStorageNullableReturnValue<T>;
export function useLocalStorage<T = string>(
  key: string,
  defaulValue: T
): LocalStorageReturnValue<T>;
export function useLocalStorage<T = string>(key: string, defaulValue: T | null = null) {
  const [localState, setLocalState] = useState<T | null>(
    localStorage.getItem(key) === null ? defaulValue : tryParse(localStorage.getItem(key)!)
  );

  const onLocalStorageChange = (event: LocalStorageChangeEvent<T> | StorageEvent) => {
    if (isTypeOfLocalStorageChangeEvent<T>(event)) {
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
    const listener = (e: Event) => onLocalStorageChange(e as LocalStorageChangeEvent<T>);
    window.addEventListener(LocalStorageChangeEvent.eventName, listener);

    window.addEventListener('storage', listener);

    if (localStorage.getItem(key) === null && defaulValue !== null) {
      setLocalStorageItem(key, defaulValue);
    }

    return () => {
      window.removeEventListener(LocalStorageChangeEvent.eventName, listener);
      window.removeEventListener('storage', listener);
    };
  }, [key]);

  const writeState = useCallback((value: T) => setLocalStorageItem(key, value), [key]);
  const deleteState = useCallback(() => removeLocalStorageItem(key), [key]);
  const state: T | null = localState ?? defaulValue;

  return [state, writeState, deleteState];
}
