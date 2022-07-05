import { createSlice } from '@reduxjs/toolkit';

import store from '../../index';

interface InitialState {
  details: any;
  showModal: boolean;
}

const initialState: InitialState = {
  details: null,
  showModal: false,
};

const slice = createSlice({
  name: 'beverageInfo',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.details = action.payload.details;
    },
    showModal: (state, action) => {
      state.showModal = action.payload.showModal;
    },
  },
});

export const setData = (details: any) => {
  store.dispatch(
    slice.actions.setData({
      details,
    })
  );
};

export const removeData = () => {
  store.dispatch(
    slice.actions.setData({
      details: null,
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
