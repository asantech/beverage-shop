import axios from 'axios';

import store from '../../store/index';
import * as reqActions from '../../store/api/req.slice';

interface APICfg {
  baseURL: any; // todo: fix later
  url: any; // todo: fix later
  method?: 'get' | 'post' | 'put' | 'patch';
  params?: any;
  data?: string | any;
  beforeReq?: any;
  afterSuccess?: any;
  afterFail?: any;
  afterDone?: any;
}

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
    store.dispatch(reqActions.actions.loadReqEnd);
  }
};