import { now } from 'lodash';

import {
  setStoredVal,
  getStoredVal,
  doesStorageKeyExist,
} from './storage.helpers';

export function setExpirableDataToStorage(key: string, val: any): void {
  const { data, expirationDuration } = val;
  const stringifiedData: string = JSON.stringify({
    data,
    expirationTime: expirationDuration ? now() + expirationDuration * 1000 : 0,
  });
  setStoredVal(key, stringifiedData);
}

export function getStoredExpirationTime(storageKey: string) {
  const storedVal = getStoredVal(storageKey);

  if (!('expirationTime' in storedVal))
    throw '"expiration time" doesn\'t exist in the stored value.';

  return storedVal.expirationTime;
}

export function isExpirationTimePassed(exiprationTime: number): boolean {
  return now() >= exiprationTime;
}

export function initializeExpirableDataToStorage(storageKey: string): void {
  if (
    !doesStorageKeyExist(storageKey) ||
    isExpirationTimePassed(getStoredExpirationTime(storageKey))
  ) {
    setExpirableDataToStorage(storageKey, {
      data: [],
      expirationDuration: 0,
    });
  }
}
