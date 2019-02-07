import { progressReducer } from '@store/hor';

import { ACTIONS, TYPE_LIST } from '../action-types';
import without from 'ramda/es/without';

export const reducer = (state = null, action) => {
  if (action.type === ACTIONS.FETCH_ALL) {
    return action.payload;
  }

  if (action.type === ACTIONS.ADD_TO_LIST) {
    return state.concat(action.payload);
  }

  if (action.type === ACTIONS.REMOVE_FROM_LIST) {
    return without([action.payload], state);
  }

  return state;
};

export const listReducer = progressReducer(
  { entityType: TYPE_LIST },
  reducer
);
