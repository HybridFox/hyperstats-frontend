import { combineReducers } from 'redux';
import { listReducer } from './list/reducers';
import { detailReducer } from './detail/reducers';

export const ReportsProcessReducer = combineReducers({
  list: listReducer,
  detail: detailReducer
});
