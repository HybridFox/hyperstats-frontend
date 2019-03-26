import { progressReducer } from '@store/hor';

import { ACTIONS, MODULE } from '../action-types';

export const reducer = (state = null, action) => {
  if (action.type === ACTIONS.FETCH_ALL) {
    return action.payload;
  }

  return state;
};

export const listReducer = progressReducer(
  { entityType: MODULE },
  reducer
);
