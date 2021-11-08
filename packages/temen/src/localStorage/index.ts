import formatISO from 'date-fns/formatISO';
import addHours from 'date-fns/addHours';
import isBefore from 'date-fns/isBefore';
import { storage } from './storage';
import { createLocalStorageChangeEvent } from './localStorageEvent';

interface LubyconStorageData<T> {
  data: T;
  expiry: string;
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
function setLocalStorageItem<T>(key: string, data: T, expiryHour?: number) {
  const payload: LubyconStorageData<T> = {
    data,
    expiry: getExpiry(expiryHour),
  };

  storage.setItem(key, JSON.stringify(payload));
  globalThis.dispatchEvent(createLocalStorageChangeEvent({ key, data }));
}

/**
 * 로컬스토리지에서 데이터를 가져옵니다. 만약 만료 시간이 지정된 데이터이고, 만료 시간이 지난 상태라면 null이 반환됩니다.
 */
function getLocalStorageItem<T>(key: string): T | null {
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
function removeLocalStorageItem(key: string) {
  storage.removeItem(key);
  globalThis.dispatchEvent(createLocalStorageChangeEvent({ key, data: null }));
}

/**
 * 로컬스토리지에서 데이터를 가져온 후 해당 데이터를 로컬스토리지에서 제거합니다.
 */
function popLocalStorageItem<T>(key: string): T | null {
  const data = getLocalStorageItem<T>(key);
  removeLocalStorageItem(key);
  globalThis.dispatchEvent(createLocalStorageChangeEvent({ key, data: null }));
  return data;
}

/**
 * 로컬스토리지 내의 모든 데이터를 제거합니다.
 */
function clearLocalStorage() {
  storage.clear();
}

export {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
  popLocalStorageItem,
  clearLocalStorage,
};
