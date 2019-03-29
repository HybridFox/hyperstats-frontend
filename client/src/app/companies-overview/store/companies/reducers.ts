import { combineReducers } from 'redux';
import { RecyclersReducer } from './recyclers/reducers';
import { OrganisationsReducer } from './organisations/reducers';

export const Reducer = combineReducers({
  recyclers: RecyclersReducer,
  organisations: OrganisationsReducer,
});
