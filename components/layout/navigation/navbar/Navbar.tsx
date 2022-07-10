import Link from 'next/link';
import type { PageLinkSettings } from 'utils/constants/pages.constants';

function Navbar({
  navLinks,
  brand,
}: {
  navLinks: Readonly<PageLinkSettings[]>;
  brand?: string;
}) {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light px-3'>
      {brand && <div className='navbar-brand'>{brand}</div>}
      <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
        {navLinks.map((navLink: PageLinkSettings) => {
          const { path, lbl } = navLink;
          return (
            <li key={path} className='nav-item mx-2'>
              <Link href={path}>
                <a className='nav-link'>{lbl}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
