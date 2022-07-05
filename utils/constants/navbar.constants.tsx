export interface NavLink {
  lbl: string;
  path: string;
}

export const navLinks: Readonly<NavLink[]> = Object.freeze([
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
