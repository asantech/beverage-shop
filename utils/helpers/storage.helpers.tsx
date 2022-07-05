import _ from 'lodash';

export function setStoredData(key: string, data: string) {
  localStorage.setItem(key, data);
}

export function getStoredData(storageKey: string) {
  const storedVal: any = localStorage.getItem(storageKey); // todo: check type later
  return JSON.parse(storedVal).data;
}

export function doesStorageKeyExist(storageKey: string) {
  return localStorage.getItem(storageKey) === null ? false : true;
}
