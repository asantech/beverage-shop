import _ from 'lodash';

export function setStoredVal(key: string, data: string): void {
  localStorage.setItem(key, data);
}

export function getStoredVal(storageKey: string) {
  const storedVal: any = localStorage.getItem(storageKey); // todo: check type later
  return JSON.parse(storedVal);
}

export function doesStorageKeyExist(storageKey: string): boolean {
  return localStorage.getItem(storageKey) === null ? false : true;
}
