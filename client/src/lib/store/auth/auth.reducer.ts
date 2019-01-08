import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';

export const AuthReducer = combineReducers({
  user: userReducer,
});
