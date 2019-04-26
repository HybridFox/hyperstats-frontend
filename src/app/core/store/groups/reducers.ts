import { progressReducer } from '@store/hor';

import { ACTIONS, TYPE_GROUPS } from '../action-types';

export const reducer = (state = null, action) => {
  if (action.type === ACTIONS.FETCH_GROUPS) {
    return action.payload;
  }

  return state;
};

export const groupsReducer = progressReducer(
  { entityType: TYPE_GROUPS },
  reducer
);
