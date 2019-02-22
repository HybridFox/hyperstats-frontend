import { combineReducers } from 'redux';
import { listReducer } from './list/reducers';
import { detailReducer } from './detail/reducers';

export const reportsReducer = combineReducers({
  list: listReducer,
  detail: detailReducer
});
