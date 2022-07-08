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
