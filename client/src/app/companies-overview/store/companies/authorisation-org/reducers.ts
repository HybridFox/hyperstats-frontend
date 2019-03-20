import { combineReducers } from 'redux';
import { OverviewReducer } from './overview/reducers';
import { DetailReducer } from './detail/reducers';

export const AuthorisationOrgReducer = combineReducers({
  overview: OverviewReducer,
  detail: DetailReducer,
});
