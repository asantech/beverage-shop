import { createSlice } from '@reduxjs/toolkit';
 

import store from '../../index';

import * as apiService from '../../../services/api/api.service';

import * as urlHelpers from '../../../utils/helpers/url.helpers';

import * as itemHelpers from '../../../utils/helpers/items.helpers';

export interface Sort {
  by: 'name' | 'abv';
  order: 'asc' | 'desc';
}

interface Category {
  list: any[];
  sort: Sort;
  page: number;
}

interface InitialState {
  currentTabID: string;
  categories: any;
}

const initialState: InitialState = {
  currentTabID: '',
  categories: {
    '': {
      list: [],
      sort: {
        by: 'name',
        order: 'asc',
      },
      page: 1,
    },
    steak: {
      list: [],
      sort: {
        by: 'name',
        order: 'asc',
      },
      page: 1,
    },
    pizza: {
      list: [],
      sort: {
        by: 'name',
        order: 'asc',
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

      state.categories[id].list = list;
      state.categories[id].page = page;
    },
    setCurrentTab: (state, action) => {
      state.currentTabID = action.payload.id;
    },
    setSort: (state, action) => {
      const { id, sort }: { id: string; sort: any } = action.payload;

      state.categories[id].sort = sort;
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
  const { id, list, page, sort } = params;

  const sortedlist = itemHelpers.sort([...list], sort);
  store.dispatch(
    slice.actions.setData({
      id,
      list: sortedlist,
      page,
    })
  );
};

export const loadData = async (params: any) => {
  // todo: should this be here or at beverage service?
 
  process.env.NEXT_PUBLIC_BASE_URL;
  process.env.NEXT_PUBLIC_BEERS_URL;
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
