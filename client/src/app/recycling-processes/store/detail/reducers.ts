import { progressReducer } from '@store/hor';

import { ACTIONS, TYPE_DETAIL } from '../action-types';

export const reducer = (state = null, action) => {
  if (action.type === ACTIONS.FETCH) {
    return action.payload;
  }

  if (action.type === ACTIONS.REMOVE) {
    return null;
  }

  return state;
};

export const detailReducer = progressReducer(
  { entityType: TYPE_DETAIL },
  reducer
);
