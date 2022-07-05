import { has, isEmpty } from 'lodash';

export function hasListItems(beverageLists: any, currentTabID: string) {
  const hasListProp = has(beverageLists, [currentTabID, 'list']);
  return (!hasListProp ||
    (hasListProp && isEmpty(beverageLists[currentTabID].list))
    ? false
    : true);
}

export function getCurrentPage(beverageLists: any, currentTabID: string) {
  return has(beverageLists, [currentTabID, 'page'])
    ? beverageLists[currentTabID].page
    : 1; // todo: use default from constants
}
