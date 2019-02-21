import { ACTIONS } from '../action-types';
import { progressReducer } from '@store/hor';
import { MODULE, LIST, RECYCLING_PROCESSES } from '../../constants';

export const reducer = (state = null, action) => {
  if (action.type === ACTIONS.LIST.FETCH) {
    return [...action.payload];
  }

  return state;
};

export const listReducer = progressReducer(
  {
    entityType: `${MODULE}/${RECYCLING_PROCESSES}/${LIST}`
  },
  reducer
);
