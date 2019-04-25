import { ACTIONS } from './action-types';

export const routerReducer = (
    state = null,
    action,
  ) => {
    if (action.type === ACTIONS.UPDATE_DATA) {
      return {
        ...state,
        data: action.payload
      };
    }

    if (action.type === ACTIONS.UPDATE_URL) {
      return {
        ...state,
        url: action.payload
      };
    }

    return state;
  };
