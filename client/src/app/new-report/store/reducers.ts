import { ACTIONS } from './action-types';
import { progressReducer } from '@store/hor';

import { TYPE_LIST } from './action-types';

export const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.FETCH) {
    return [
      ...action.payload,
    ];
  }

  return state;
};

export const reportsReducer = progressReducer(
  { entityType: TYPE_LIST },
  reducer,
);
