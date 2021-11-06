/** @module Utils */
export { default as delay } from './delay';
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
export { default as commaizeNumber } from './commaizeNumber';
export { default as getObjectKeys } from './getObjectKeys';
export * from './is';
export * from './queryString';
export * from './promise';
export * from './date';
export { default as getArrayFromCount } from './array/getArrayFromCount';
export * from './array/createFromArray';
export * from './copyToClipboard';
export * from './svg';
export * from './fetch';
export * from './uuid';
export * from './cookies';
export * from './functions';
