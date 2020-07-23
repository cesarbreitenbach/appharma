/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import userReducer from './userReducer';
import tabReducer from './tabReducer'

export default combineReducers({
  userReducer,
  tabReducer
});
