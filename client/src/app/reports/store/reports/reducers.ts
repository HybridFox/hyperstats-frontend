import { combineReducers } from 'redux';
import { overviewReducer } from './overview/reducers';
import { detailReducer } from './detail/reducers';

export const reportsReducer = combineReducers({
  overview: overviewReducer,
  detail: detailReducer
});
