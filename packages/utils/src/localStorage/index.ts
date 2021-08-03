import formatISO from 'date-fns/formatISO';
import addHours from 'date-fns/addHours';
import isBefore from 'date-fns/isBefore';
import { storage } from './storage';

interface LubyconStorageData<T> {
  data: T;
  expiry: string;
}

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

export class LocalStorageChanged<T> extends CustomEvent<LocalStorageEventPayload<T>> {
  static eventName = 'onLocalStorageChange';

  constructor(payload: LocalStorageEventPayload<T>) {
    super(LocalStorageChanged.eventName, { detail: payload });
  }
}

export function isTypeOfLocalStorageChanged<T>(event: any): event is LocalStorageChanged<T> {
  return !!event && event.type === LocalStorageChanged.eventName;
}

function getExpiry(expiryHour?: number) {
  const now = new Date();
  if (expiryHour != null) {
    return formatISO(addHours(now, expiryHour));
  } else {
    return '';
  }
}

function isLubyconUtilsItem<T>(item: LubyconStorageData<T> | T): item is LubyconStorageData<T> {
  return 'data' in item && 'expiry' in item;
}

/**
 * 로컬스토리지에 데이터를 저장합니다. 3번째 인자 expiryHour로 데이터의 만료 시간을 지정할 수 있습니다.
 */
export function setLocalStorageItem<T>(key: string, data: T, expiryHour?: number) {
  const payload: LubyconStorageData<T> = {
    data,
    expiry: getExpiry(expiryHour),
  };

  storage.setItem(key, JSON.stringify(payload));
  window.dispatchEvent(new LocalStorageChanged({ key, data }));
}

/**
 * 로컬스토리지에서 데이터를 가져옵니다. 만약 만료 시간이 지정된 데이터이고, 만료 시간이 지난 상태라면 null이 반환됩니다.
 */
export function getLocalStorageItem<T>(key: string): T | null {
  const payload = storage.getItem(key);
  if (payload == null) {
    return null;
  }

  const parsedPayload: LubyconStorageData<T> | T = JSON.parse(payload);
  if (isLubyconUtilsItem(parsedPayload)) {
    const now = new Date();
    const expiry = new Date(parsedPayload.expiry);

    if (isNaN(expiry.getTime()) || isBefore(now, expiry)) {
      return parsedPayload.data;
    } else {
      storage.removeItem(key);
      return null;
    }
  } else {
    return parsedPayload;
  }
}

/**
 * 로컬스토리지에서 데이터를 제거합니다.
 */
export function removeLocalStorageItem(key: string) {
  storage.removeItem(key);
  window.dispatchEvent(new LocalStorageChanged({ key, data: null }));
}

/**
 * 로컬스토리지에서 데이터를 가져온 후 해당 데이터를 로컬스토리지에서 제거합니다.
 */
export function popLocalStorageItem<T>(key: string): T | null {
  const data = getLocalStorageItem<T>(key);
  removeLocalStorageItem(key);
  return data;
}

/**
 * 로컬스토리지 내의 모든 데이터를 제거합니다.
 */
export function clearLocalStorage() {
  storage.clear();
}
