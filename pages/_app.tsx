import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '../components/layout/Layout';
import store from '../store/index';

import '../styles/globals.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div id='modals-container'></div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div
        id='toasts-container'
        className='toast-container position-absolute bottom-0 end-0 p-3'
      ></div>
    </Provider>
  );
}

export default MyApp;
