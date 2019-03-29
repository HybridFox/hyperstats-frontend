import { ACTIONS, MODULE, DETAIL } from '../action-types';
import { progressReducer } from '@store/hor';

const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.DETAIL.FETCH) {
    return action.payload;
  }

  return state;
};

export const DetailReducer = progressReducer(
  { entityType: `${MODULE}/${DETAIL}` },
  reducer,
);
