export interface PageLinkSettings {
  lbl: string;
  path: string;
}

export const navLinks: Readonly<PageLinkSettings[]> = Object.freeze([
  {
    lbl: 'Home',
    path: '/',
  },
  {
    lbl: 'Cart',
    path: '/cart',
  },
  {
    lbl: 'Favourites',
    path: '/favourites',
  },
]);
