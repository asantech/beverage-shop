import { createSlice } from '@reduxjs/toolkit';

import store from 'store/index';
import * as expirationHelpers from 'utils/helpers/expiration.helpers';
import storageConsts from 'utils/constants/storage.constants';

interface InitialState {
  list: any[];
}

const initialState: InitialState = {
  list: [],
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
    },
    add: (state, action) => {
      state.list.push(action.payload.product);
    },
    del: (state, action) => {
      const { id: selectedProductID } = action.payload.product;

      state.list = state.list.filter((product: any) => {
        if (!(selectedProductID === product.id)) return product;
      });
    },
  },
});

export const setList = (list: any) => {
  store.dispatch(slice.actions.setList(list));
};

export const add = (product: any) => {
  // put try catch if was already added
  store.dispatch(
    slice.actions.add({
      product,
    })
  );
  expirationHelpers.setExpirableDataToStorage('favorites', {
    data: store.getState().favorites.list,
    expirationDuration: storageConsts.expirationDurations.favorite,
  });
};

export const del = (product: any) => {
  // put try catch if doesnt exist
  store.dispatch(
    slice.actions.del({
      product,
    })
  );
  expirationHelpers.setExpirableDataToStorage('favorites', {
    data: store.getState().favorites.list,
    expirationDuration: storageConsts.expirationDurations.favorite,
  });
};

export const isFavorite = (product: any) => {
  // todo: dry principle
  const { id: selectedProductID } = product;
  const favoritesList = store.getState().favorites.list;
  let isFavorite = false;
  favoritesList.forEach((product: any) => {
    if (product.id === selectedProductID) {
      return (isFavorite = true);
    }
  });
  return isFavorite;
};

export default slice.reducer;
