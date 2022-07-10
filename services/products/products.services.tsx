import { isEmpty } from 'lodash';

import { callAPI } from 'services/api/api.services';

import * as urlHelpers from 'utils/helpers/url.helpers';
import { showToast } from 'utils/helpers/notification.helpers';

import msgsConstants from 'utils/constants/msgs.constants';

export const loadData = (params: any) => {
  let urlParams = urlHelpers.createdURLQueryObj(params.tabID, params.page);
  return callAPI({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    url: process.env.NEXT_PUBLIC_BEERS_URL,
    params: urlParams, // todo: check the naming later
    afterSuccess: function (list: any) {
      if (!isEmpty(list)) {
        showToast({
          role: 'success',
          msgs: msgsConstants.products.loadSuccess,
        });
      }
    },
  });
};
