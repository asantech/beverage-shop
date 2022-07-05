import { createSlice } from '@reduxjs/toolkit';

import store from '../../index';

interface InitialState {
  data: any;
  showModal: boolean;
}

const initialState: InitialState = {
  data: {},
  showModal: false,
};

const slice = createSlice({
  name: 'beverageInfo',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
    },
    showModal: (state, action) => {
      state.showModal = action.payload.showModal;
    },
  },
});

export const setData = (data: any) => {
  store.dispatch(
    slice.actions.setData({
      data,
    })
  );
};

export const removeData = () => {
  store.dispatch(
    slice.actions.setData({
      data: {},
    })
  );
};

export const showModal = () => {
  store.dispatch(
    slice.actions.showModal({
      showModal: true,
    })
  );
};

export const hideModal = () => {
  store.dispatch(
    slice.actions.showModal({
      showModal: false,
    })
  );
};

export default slice.reducer;
