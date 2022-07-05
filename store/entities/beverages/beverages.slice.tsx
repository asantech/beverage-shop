import { createSlice } from '@reduxjs/toolkit';

import store from '../../index';

import * as apiService from '../../../services/api/api.service';

import * as urlHelpers from '../../../utils/helpers/url.helpers';

import * as itemHelpers from '../../../utils/helpers/items.helpers';

interface InitialState {
  currentTabID: string;
  lists: any;
}

const initialState: InitialState = {
  currentTabID: '',
  lists: {
    '': {
      list: [],
      sort: {
        by: 'name',
        order: 'desc',
      },
      page: 1,
    },
    steak: {
      list: [],
      sort: {
        by: 'name',
        order: 'desc',
      },
      page: 1,
    },
    pizza: {
      list: [],
      sort: {
        by: 'name',
        order: 'desc',
      },
      page: 1,
    },
  },
};

const slice = createSlice({
  name: 'beverages',
  initialState,
  reducers: {
    setData: (state, action) => {
      const { id, list, page }: { id: string; list: []; page: number } =
        action.payload;

      const sortedlist = itemHelpers.sort([...list], state.lists[id].sort);

      state.lists[id].list = sortedlist;
      state.lists[id].page = page;
    },
    setCurrentTab: (state, action) => {
      state.currentTabID = action.payload.id;
    },
    setSort: (state, action) => {
      const { id, sort }: { id: string; sort: any } = action.payload;
      const { by, order } = sort;

      by && (state.lists[id].sort.by = by);
      order && (state.lists[id].sort.order = order);
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

export const setSort = async (params: any) => {
  const { id, sort } = params;

  store.dispatch(
    slice.actions.setSort({
      id,
      sort,
    })
  );
};

export default slice.reducer;
