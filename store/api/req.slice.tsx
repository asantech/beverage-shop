import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  loading: boolean;
}

const initialState: InitialState = {
  loading: false,
};

const slice = createSlice({
  name: 'req',
  initialState,
  reducers: {
    loadReqStart: state => {
      state.loading = true;
    },
    loadReqEnd: state => {
      state.loading = false;
    },
  },
});

export const actions = slice.actions;

export default slice.reducer;
