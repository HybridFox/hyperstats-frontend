import { progressReducer } from '@store/hor';

import { ACTIONS, MODULE, COMPANIES } from './action-types';

const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.FETCH) {
    return action.payload;
  }

  return state;
};

export const ReducerConfig = {
  companies: progressReducer(
    { entityType: `${MODULE}/${COMPANIES}` },
    reducer
  ),
};
