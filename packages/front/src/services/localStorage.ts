class Storage {
  private storage: globalThis.Storage;
  constructor() {
    this.storage = localStorage;
  }

  getStorage(key: string) {
    return this.storage.getItem(key);
  }

  setStorage<TStorageValue>(key: string, value: TStorageValue) {
    if (this.getStorage(key)) {
      return this.getStorage(key);
    }
    return this.storage.setItem(key, JSON.stringify(value));
  }
  removeStorage(key: string) {
    return this.storage.removeItem(key);
  }
  clearStorage() {
    return this.storage.clear();
  }
}

export const storage = new Storage();
