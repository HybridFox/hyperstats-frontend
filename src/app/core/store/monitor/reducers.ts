import { progressReducer } from '@store/hor';

import { ACTIONS, TYPE_MONITOR } from '../action-types';

export const reducer = (state = null, action) => {
  if (action.type === ACTIONS.FETCH_MONITOR) {
    return action.payload
  }

  return state;
};

export const monitorReducer = progressReducer(
  { entityType: TYPE_MONITOR },
  reducer
);
