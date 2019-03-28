import { ACTIONS } from '../../action-types';
import { MODULE, ORGANISATIONS } from '../../constants';
import { OVERVIEW } from '../action-types';
import { progressReducer } from '@store/hor';

export const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.ORGANISATIONS.OVERVIEW.FETCH) {
    return action.payload;
  }

  return state;
};

export const OverviewReducer = progressReducer(
  { entityType: `${MODULE}/${ORGANISATIONS}/${OVERVIEW}` },
  reducer,
);
