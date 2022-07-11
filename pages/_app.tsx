import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

import { createRoot } from 'react-dom/client';

import Layout from 'components/layout/Layout';
import store from 'store/index';

import * as rootElementsHelpers from 'utils/helpers/rootElements.helpers';

import 'styles/globals.css';
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'node_modules/bootstrap-icons/font/bootstrap-icons.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const modalsContainerRootCreator = function () {
      return createRoot(
        //@ts-ignore
        document.getElementById('modals-container')
      );
    };
    const toastsContainerRootCreator = function () {
      return createRoot(
        //@ts-ignore
        document.getElementById('toasts-container')
      );
    };

    rootElementsHelpers.setRootElementCreator({
      modalsContainer: modalsContainerRootCreator,
    });

    rootElementsHelpers.setRootElementCreator({
      toastsContainer: toastsContainerRootCreator,
    });
  }, []);

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

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}
