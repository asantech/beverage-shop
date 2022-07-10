import axios from 'axios';

import store from 'store/index';
import * as reqActions from 'store/api/req.slice';

import msgsConstants from 'utils/constants/msgs.constants';

import Toast from 'components/common/toasts/Toast';

import * as rootElementsHelpers from 'utils/helpers/rootElements.helpers';

interface APICfg {
  baseURL: string | undefined; // todo: check why without "undefined" type, typescript gives err
  url: string | undefined; // todo: check why without "undefined" type, typescript gives err
  method?: 'get' | 'post' | 'put' | 'patch';
  params?: any;
  data?: string | any;
  beforeReq?: any;
  afterSuccess?: any;
  afterFail?: any;
  afterDone?: any;
}

axios.interceptors.response.use(undefined, error => {
  const isExpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  rootElementsHelpers
    .getRootElement('toastsContainer')
    .render(
      <Toast
        msgs={
          (isExpectedError ? '' : msgsConstants.errs.unexpectedErr + '\n') +
          error.message
        }
      />
    );

  return Promise.reject(error);
});

export const callAPI = async (cfg: APICfg) => {
  const {
    baseURL,
    url,
    method,
    params,
    data,
    beforeReq,
    afterSuccess,
    afterFail,
    afterDone,
  } = cfg;

  store.dispatch(reqActions.actions.loadReqStart());
  beforeReq && beforeReq();
  try {
    const res = await axios.request({
      baseURL,
      url,
      method: method ?? 'get',
      params,
      data,
    });
    afterSuccess && afterSuccess(res.data);
    afterDone && afterDone();
    store.dispatch(reqActions.actions.loadReqEnd());
    return res.data;
  } catch (err) {
    afterFail && afterFail(err);
    afterDone && afterDone();
    store.dispatch(reqActions.actions.loadReqEnd());
  }
};
