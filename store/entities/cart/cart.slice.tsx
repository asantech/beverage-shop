import { createSlice } from '@reduxjs/toolkit';

import store from '../../index';
import * as expirationHelpers from './../../../utils/helpers/expiration.helpers.tsx';
import storageConsts from './../../../utils/constants/storage.constants';

interface InitialState {
  list: any[];
}

const initialState: InitialState = {
  list: [],
};

const slice = createSlice({
  name: 'cart',
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
  expirationHelpers.setExpirableDataToStorage('cart', {
    data: store.getState().cart.list,
    expirationDuration: storageConsts.expirationDurations.cart,
  });
};

export const del = (product: any) => {
  // put try catch if doesnt exist
  store.dispatch(
    slice.actions.del({
      product,
    })
  );
  expirationHelpers.setExpirableDataToStorage('cart', {
    data: store.getState().cart.list,
    expirationDuration: storageConsts.expirationDurations.cart,
  });
};

export const isInCart = (product: any) => {
  // todo: dry principle
  const { id: selectedProductID } = product;
  const cartList = store.getState().cart.list;
  let isInCart = false;
  cartList.forEach((product: any) => {
    if (product.id === selectedProductID) {
      return (isInCart = true);
    }
  });
  return isInCart;
};

export default slice.reducer;
