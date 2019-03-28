import { ACTIONS } from '../action-types';
import { progressReducer } from '@store/hor';
import { MODULE, LIST } from '../../constants';

export const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.LIST.FETCH) {
    return [
      ...action.payload
    ];
  }

  if (action.type === ACTIONS.LIST.ADD_TO_LIST) {
    if (state) {
      return state.concat(action.payload);
    }

    return [...action.payload];
  }

  return state;
};

export const listReducer = progressReducer({
  entityType: `${MODULE}/${LIST}`
}, reducer);
