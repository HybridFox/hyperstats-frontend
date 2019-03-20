import { combineReducers } from 'redux';
import { RecyclersReducer } from './recyclers/reducers';
import { AuthorisationOrgReducer } from './authorisation-org/reducers';

export const Reducer = combineReducers({
    recyclers: RecyclersReducer,
    authorisationOrg: AuthorisationOrgReducer,
});
