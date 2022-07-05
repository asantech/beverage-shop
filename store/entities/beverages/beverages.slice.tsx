import { createSlice } from '@reduxjs/toolkit';

import store from '../../index';

import * as apiService from '../../../services/api/api.service';

import * as urlHelpers from '../../../utils/helpers/url.helpers';

interface InitialState {
  currentTabID: string;
  lists: any;
}

const initialState: InitialState = {
  currentTabID: '',
  lists: {},
};

const slice = createSlice({
  name: 'beverages',
  initialState,
  reducers: {
    setData: (state, action) => {
      const { id, list, page }: { id: string; list: []; page: number } =
        action.payload;

      state.lists[id] = {
        list,
        page,
      };
    },
    setCurrentTab: (state, action) => {
      state.currentTabID = action.payload.id;
    },
  },
});

export const setCurrentTab = (params: any) => {
  const { id } = params;
  store.dispatch(
    slice.actions.setCurrentTab({
      id,
    })
  );
};

export const setData = (params: any) => {
  const { id, list, page } = params;

  store.dispatch(
    slice.actions.setData({
      id,
      list,
      page,
    })
  );
};

export const loadData = async (params: any) => {
  // todo: should this be here or at beverage service?
  // console.log(process.env.BASE_URL, process.env.BEERS_URL);
  let result;
  let urlParams = urlHelpers.createdURLQueryObj(params.tabID, params.page);
  result = await apiService.callAPI({
    baseURL: 'https://api.punkapi.com/v2/', //process.env.BASE_URL
    url: 'beers', //process.env.BEERS_URL
    params: urlParams, // todo: check the naming later
  });
  return result;
};

export default slice.reducer;
