import { progressReducer } from '@store/hor';

import { ACTIONS, TYPE_DASHBOARDMONITOR } from '../action-types';

export const reducer = (state = null, action) => {
  if (action.type === ACTIONS.FETCH_DASHBOARDMONITOR) {
    return {
      ...state,
      [action.payload.id]: action.payload
    };
  }

  return state;
};

export const dashboardMonitorReducer = progressReducer(
  { entityType: TYPE_DASHBOARDMONITOR },
  reducer
);
