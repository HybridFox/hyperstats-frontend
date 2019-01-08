import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { registerReducer } from './register/register.reducer';

export const AuthReducer = combineReducers({
  user: userReducer,
  register: registerReducer,
});
