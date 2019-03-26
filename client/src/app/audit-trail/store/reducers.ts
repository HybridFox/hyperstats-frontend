import { combineReducers } from 'redux';
import { listReducer } from './list/reducers';

export const auditTrailReducer = combineReducers({
  list: listReducer,
});
