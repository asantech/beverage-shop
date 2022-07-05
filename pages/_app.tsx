import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '../components/layout/Layout';
import store from '../store/index';

import ItemInfoModal from '../components/common/modal/ItemInfoModal';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ItemInfoModal />
    </Provider>
  );
}

export default MyApp;
