import { combineReducers } from 'redux';
import { listReducer } from './list/reducers';

export const proxiesReducer = combineReducers({
  list: listReducer,
});
