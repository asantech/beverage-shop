export interface categorySettings {
  id: string;
  lbl: string;
  path: string;
}

export const categoriesSettings: Readonly<categorySettings[]> = Object.freeze([
  {
    id: '',
    lbl: 'All',
    path: '/',
  },
  {
    id: 'steak',
    lbl: 'With Steak',
    path: '/steak',
  },
  {
    id: 'pizza',
    lbl: 'With Pizza',
    path: '/pizza',
  },
]);

export const categories: Readonly<categorySettings[]> = Object.freeze([
  {
    id: '',
    lbl: 'All',
    path: '/',
  },
  {
    id: 'steak',
    lbl: 'With Steak',
    path: '/steak',
  },
  {
    id: 'pizza',
    lbl: 'With Pizza',
    path: '/pizza',
  },
]);

export const categoriesInitialStates = Object.freeze({
  '': {
    list: [],
    sort: {
      by: 'name',
      order: 'asc',
    },
    page: 1,
  },
  steak: {
    list: [],
    sort: {
      by: 'name',
      order: 'asc',
    },
    page: 1,
  },
  pizza: {
    list: [],
    sort: {
      by: 'name',
      order: 'asc',
    },
    page: 1,
  },
});
