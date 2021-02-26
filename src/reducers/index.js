/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import userReducer from './userReducer';
import tabReducer from './tabReducer';
import authReducer from './authReducer';
import vitrineReducer from './vitrineReducer';
import cartReducer from './cartReducer'
import checkoutReducer from './checkoutReducer'
import shopReducer from './shopReducer'
import messageReducer from './messageReducer'

export default combineReducers({
  userReducer,
  tabReducer,
  authReducer,
  vitrineReducer,
  cartReducer,
  checkoutReducer,
  shopReducer,
  messageReducer
});
