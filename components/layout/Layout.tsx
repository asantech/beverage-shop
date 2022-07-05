import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { navLinks } from '../../utils/constants/navbar.constants';
import styles from './Layout.module.scss';

const DynamicNavbar = dynamic(() => import('./navigation/navbar/Navbar'), {
  suspense: true,
});

const DynamicFooter = dynamic(() => import('./footer/Footer'), {
  suspense: true,
});

function Layout({ children }: any) {
  //todo: change type
  return (
    <Suspense fallback={'Loading...'}>
      <div className={styles.layout + ' vh-100'}>
        <header>
          <DynamicNavbar navLinks={navLinks} brand='Beverage Shop' />
        </header>
        <main className='p-3'>{children}</main>
        <DynamicFooter />
      </div>
    </Suspense>
  );
}

export default Layout;
