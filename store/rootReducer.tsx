import { combineReducers } from '@reduxjs/toolkit';

import reqReducer from '../store/api/req.slice';
import beveragesReducer from '../store/entities/beverages/beverages.slice';
import favoritesSlice from './entities/favorites/favorites.slice';
import cartSlice from './entities/cart/cart.slice';

export default combineReducers({
  req: reqReducer,
  beverages: beveragesReducer,
  favorites: favoritesSlice,
  cart: cartSlice,
});
