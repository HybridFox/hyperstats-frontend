import { ACTIONS } from '../../action-types';
import { MODULE, RECYCLERS } from '../../constants';
import { OVERVIEW } from '../action-types';
import { progressReducer } from '@store/hor';

export const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.RECYCLERS.OVERVIEW.FETCH) {
    return action.payload;
  }

  return state;
};

export const OverviewReducer = progressReducer(
  { entityType: `${MODULE}/${RECYCLERS}/${OVERVIEW}` },
  reducer,
);
