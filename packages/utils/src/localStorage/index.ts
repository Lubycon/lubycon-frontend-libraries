import formatISO from 'date-fns/formatISO';
import addHours from 'date-fns/addHours';
import isBefore from 'date-fns/isBefore';
import { isServer } from '../constants/env';

interface LubyconStorageData<T> {
  data: T;
  expiry: string;
}

function canUseStorage() {
  if (isServer === true) {
    return false;
  }

  let storage;
  try {
    storage = window.localStorage;
    const testItem = '__storage_test__';
    storage.setItem(testItem, testItem);
    storage.removeItem(testItem);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage &&
      storage.length > 0
    );
  }
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

function printNoStorageWarningLog() {
  console.warn('로컬스토리지를 사용할 수 없는 환경입니다');
}

/**
 * 로컬스토리지에 데이터를 저장합니다. 3번째 인자 expiryHour로 데이터의 만료 시간을 지정할 수 있습니다.
 */
export function setLocalStorageItem<T>(key: string, data: T, expiryHour?: number) {
  if (!canUseStorage()) {
    printNoStorageWarningLog();
    return;
  }

  const payload: LubyconStorageData<T> = {
    data,
    expiry: getExpiry(expiryHour),
  };

  window.localStorage.setItem(key, JSON.stringify(payload));
}

/**
 * 로컬스토리지에서 데이터를 가져옵니다. 만약 만료 시간이 지정된 데이터이고, 만료 시간이 지난 상태라면 null이 반환됩니다.
 */
export function getLocalStorageItem<T>(key: string): T | null {
  if (!canUseStorage()) {
    printNoStorageWarningLog();
    return null;
  }

  const payload = window.localStorage.getItem(key);
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
      window.localStorage.removeItem(key);
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
  if (!canUseStorage()) {
    printNoStorageWarningLog();
    return;
  }

  window.localStorage.removeItem(key);
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
  if (!canUseStorage()) {
    printNoStorageWarningLog();
    return;
  }

  window.localStorage.clear();
}
