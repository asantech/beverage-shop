import { callAPI } from 'services/api/api.services';

import * as urlHelpers from 'utils/helpers/url.helpers';

export const loadData = (params: any) => {
  let urlParams = urlHelpers.createdURLQueryObj(params.tabID, params.page);

  return callAPI({
    baseURL: process.env.BASE_URL,
    url: process.env.BEERS_URL,
    params: urlParams, // todo: check the naming later
  });
};
