import { createSlice } from '@reduxjs/toolkit';

import store from 'store/index';

import * as itemHelpers from 'utils/helpers/items.helpers';

import { categoriesInitialStates } from 'utils/constants/products.constants';

export interface Sort {
  by: 'name' | 'abv';
  order: 'asc' | 'desc';
}

interface Category {
  // todo: find the code to apply this type
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
  categories: categoriesInitialStates,
};

const slice = createSlice({
  name: 'products',
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
  const { id, list = [], page, sort } = params;

  const sortedlist = itemHelpers.sort([...list], sort);
  store.dispatch(
    slice.actions.setData({
      id,
      list: sortedlist,
      page,
    })
  );
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
