interface APICfg {
  baseURL: string;
  url: string;
}

interface BeverageNavLink {
  id: string;
  lbl: string;
  path: string;
}

export const beveragesNavLinks: Readonly<BeverageNavLink[]> = Object.freeze([
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
