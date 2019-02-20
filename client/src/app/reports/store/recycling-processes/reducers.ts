import { ACTIONS } from './action-types';
import { progressReducer } from '@store/hor';

import { RECYCLING_PROCESSES } from './action-types';
import { MODULE } from '../constants';

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

export const ReportsProcessReducer = progressReducer(
  { entityType: `${MODULE}/${RECYCLING_PROCESSES}` },
  reducer,
);
