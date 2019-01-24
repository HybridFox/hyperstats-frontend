import { combineReducers } from 'redux';
import { listReducer } from './list/reducers';
import { detailReducer } from './detail/reducers';

export const customsOfficesReducers = combineReducers({
  list: listReducer,
  detail: detailReducer,
});
