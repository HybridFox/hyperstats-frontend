import { progressReducer } from '@store/hor';

import { ACTIONS, TYPE_MONITORS } from '../action-types';

export const reducer = (state = null, action) => {
  if (action.type === ACTIONS.FETCH_MONITOR) {
    return {
      ...state,
      [action.payload.id]: action.payload
    };
  }

  return state;
};

export const monitorReducer = progressReducer(
  { entityType: TYPE_MONITORS },
  reducer
);
