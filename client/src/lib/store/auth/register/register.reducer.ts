import { progressReducer } from '@store/hor';

import { ACTIONS, TYPE_REGISTER } from '../auth.action-types';

const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.REGISTER_USER) {
    return action.payload;
  }

  return state;
};

export const registerReducer = progressReducer(
  { entityType: TYPE_REGISTER },
  reducer,
);
