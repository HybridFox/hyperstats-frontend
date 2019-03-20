import { combineReducers } from 'redux';
import { OverviewReducer } from './overview/reducers';
import { DetailReducer } from './detail/reducers';

export const RecyclersReducer = combineReducers({
  overview: OverviewReducer,
  detail: DetailReducer,
});
