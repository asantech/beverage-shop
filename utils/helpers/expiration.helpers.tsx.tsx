import _ from 'lodash';

import {
  setStoredData,
  getStoredData,
  doesStorageKeyExist,
} from './storage.helpers';

export function setExpirableDataToStorage(key: string, val: any) {
  const { data, expirationDuration } = val;
  const stringifiedData: string = JSON.stringify({
    data,
    expirationTime: _.now() + expirationDuration * 1000,
  });
  setStoredData(key, stringifiedData);
}

export function getStoredExpirationTime(storageKey: string) {
  const storedVal = getStoredData(storageKey);

  if (!('expirationTime' in storedVal))
    throw '"expiration time" doesn\'t exist in the stored value.';

  return storedVal.expirationTime;
}

export function isExpirationTimePassed(exiprationTime: number) {
  return _.now() >= exiprationTime;
}

export function initializeExpirableDataToStorage(storageKey: string) {
  if (
    !doesStorageKeyExist(storageKey) ||
    isExpirationTimePassed(getStoredExpirationTime(storageKey))
  ) {
    setExpirableDataToStorage(storageKey, {
      data: [],
      expirationTime: 0,
    });
  }
}
