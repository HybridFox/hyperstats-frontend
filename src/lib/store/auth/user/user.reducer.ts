import { progressReducer } from '@store/hor';

import { ACTIONS, TYPE_USER } from '../auth.action-types';

const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.FETCH_USER) {
    return action.payload;
  }

  if (action.type === ACTIONS.CLEAR_USER) {
    return null;
  }

  return state;
};

export const userReducer = progressReducer(
  { entityType: TYPE_USER },
  reducer,
);
