import { ACTIONS, MODULE, OVERVIEW } from '../action-types';
import { progressReducer } from '@store/hor';
import without from 'ramda/es/without';

export const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.OVERVIEW.FETCH) {
    return action.payload;
  }

  if (action.type === ACTIONS.OVERVIEW.ADD_TO_LIST) {
    return state.concat(action.payload);
  }

  if (action.type === ACTIONS.OVERVIEW.REMOVE_FROM_LIST) {
    return without([action.payload], state);
  }

  return state;
};

export const OverviewReducer = progressReducer(
  { entityType: `${MODULE}/${OVERVIEW}` },
  reducer,
);
