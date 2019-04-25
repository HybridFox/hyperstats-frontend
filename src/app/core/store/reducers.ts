import { combineReducers } from 'redux';
import { listReducer } from './list/reducers';

export const coreReducer = combineReducers({
  list: listReducer,
});
