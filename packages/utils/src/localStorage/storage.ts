function canUseStorage() {
  const storage = globalThis.localStorage;
  if (storage == null) {
    return false;
  }

  try {
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

interface IStorage {
  getItem(key: string): string | null;
  setItem(Key: string, value: string): void;
  removeItem(key: string): void;
}

export class LocalStorage implements IStorage {
  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

export class MemoryStorage implements IStorage {
  private _memoryStorage = new Map<string, string>();

  getItem(key: string) {
    return this._memoryStorage.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this._memoryStorage.set(key, value);
  }

  removeItem(key: string) {
    this._memoryStorage.delete(key);
  }
  clear() {
    this._memoryStorage.clear();
  }
}

const storageFrom = (isAvailable: boolean) =>
  isAvailable ? new LocalStorage() : new MemoryStorage();

export const storage = storageFrom(canUseStorage());
