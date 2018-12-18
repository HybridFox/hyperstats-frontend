import { ACTIONS } from './action-types';

export const ReportsReducer = (state = null, action)  => {
  switch (action.type) {

    case ACTIONS.FETCH:
      return {
        ...action.payload,
      };

    default:
      return state;

  }
};
