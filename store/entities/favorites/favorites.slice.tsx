import { createSlice } from '@reduxjs/toolkit';

import store from '../../index';

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

export const add = (product: any) => {
  // put try catch if was already added
  store.dispatch(
    slice.actions.add({
      product,
    })
  );
};

export const del = (product: any) => {
  // put try catch if doesnt exist
  store.dispatch(
    slice.actions.del({
      product,
    })
  );
};

export const isFavorite = (product: any) => {
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
