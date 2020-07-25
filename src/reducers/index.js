/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import userReducer from './userReducer';
import tabReducer from './tabReducer';
import authReducer from './authReducer';
import vitrineReducer from './vitrineReducer'

export default combineReducers({
  userReducer,
  tabReducer,
  authReducer,
  vitrineReducer
});
