import { combineReducers } from '@reduxjs/toolkit';

import reqReducer from '../store/api/req.slice';
import beveragesReducer from '../store/entities/beverages/beverages.slice';
import beverageInfoSlice from './entities/beverages/beverageInfo.slice';

export default combineReducers({
  req: reqReducer,
  beverages: beveragesReducer,
  beverageInfo: beverageInfoSlice,
});
