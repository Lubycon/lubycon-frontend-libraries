/** @module Browser-toolkit */
export {
  createLocalStorageChangeEvent,
  LocalStorageEventPayload,
} from './localStorage/localStorageEvent';
export {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
  popLocalStorageItem,
  clearLocalStorage,
} from './localStorage';
export * from './copyToClipboard';
export * from './fetch';
export * from './cookies';