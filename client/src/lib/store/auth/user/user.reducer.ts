import { progressReducer } from '@store/hor';

import { ACTIONS, TYPE_REGISTER } from '../auth.action-types';

const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.LOGIN_USER) {
    return action.payload;
  }

  if (action.type === ACTIONS.CLEAR_USER) {
    return null;
  }

  return state;
};

export const userReducer = progressReducer(
  { entityType: TYPE_REGISTER },
  reducer,
);
