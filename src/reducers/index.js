/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import userReducer from './userReducer';
import tabReducer from './tabReducer';
import authReducer from './authReducer';
import vitrineReducer from './vitrineReducer';
import cartReducer from './cartReducer'
import checkoutReducer from './checkoutReducer'

export default combineReducers({
  userReducer,
  tabReducer,
  authReducer,
  vitrineReducer,
  cartReducer,
  checkoutReducer
});
