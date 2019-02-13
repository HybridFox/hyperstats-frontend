import { ACTIONS } from './../action-types';
import { progressReducer } from '@store/hor';

import { TYPE } from './../action-types';

export const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.FETCH_RECYCLINGPROCESSES) {
    return [
      ...action.payload,
    ];
  }

  return state;
};

export const recyclingProcessesReducer = progressReducer(
  { entityType: TYPE },
  reducer,
);
