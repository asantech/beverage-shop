import { combineReducers } from '@reduxjs/toolkit';

import reqReducer from 'store/api/req.slice';
import productsReducer from 'store/entities/products/products.slice';
import favoritesSlice from 'store/entities/favorites/favorites.slice';
import cartSlice from 'store/entities/cart/cart.slice';

export default combineReducers({
  req: reqReducer,
  products: productsReducer,
  favorites: favoritesSlice,
  cart: cartSlice,
});
