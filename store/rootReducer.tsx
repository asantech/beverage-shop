import { combineReducers } from '@reduxjs/toolkit';

import reqReducer from '../store/api/req.slice';
import productsReducer from './entities/products/products.slice';
import favoritesSlice from './entities/favorites/favorites.slice';
import cartSlice from './entities/cart/cart.slice';

export default combineReducers({
  req: reqReducer,
  products: productsReducer,
  favorites: favoritesSlice,
  cart: cartSlice,
});
