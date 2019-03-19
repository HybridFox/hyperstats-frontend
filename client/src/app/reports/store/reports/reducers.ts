import { combineReducers } from 'redux';
import { listReducer } from './list/reducers';
import { detailReducer } from './detail/reducers';
import { companiesReducer } from './companies/reducers';

export const reportsReducer = combineReducers({
  list: listReducer,
  detail: detailReducer,
  companies: companiesReducer
});
