import { ACTIONS } from '../action-types';
import { progressReducer } from '@store/hor';
import { MODULE, COMPANIES } from '../../constants';

export const reducer = (
  state = null,
  action,
) => {
  if (action.type === ACTIONS.COMPANIES.FETCH) {
    return [
      ...action.payload
    ];
  }

  return state;
};

export const companiesReducer = progressReducer({
  entityType: `${MODULE}/${COMPANIES}`
}, reducer);
