import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '../components/layout/Layout';
import store from '../store/index';

import { createRoot } from 'react-dom/client';

import '../styles/globals.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id='modals-root'></div>
    </Provider>
  );
}

export default MyApp;
