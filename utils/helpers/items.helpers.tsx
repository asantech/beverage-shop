import { has } from 'lodash';

export function getCurrentPage(beverageLists: any, currentTabID: string) {
  return has(beverageLists, [currentTabID, 'page'])
    ? beverageLists[currentTabID].page
    : 1; // todo: use default from constants
}

export function sort(list: any, sort: any) {
  const { by: sortBy, order }: { by: string; order: 'asc' | 'desc' } = sort;
  list.sort((a: any, b: any) => {
    return order === 'asc' ? a[sortBy] > b[sortBy] : a[sortBy] < b[sortBy];
  });

  return list;
}
