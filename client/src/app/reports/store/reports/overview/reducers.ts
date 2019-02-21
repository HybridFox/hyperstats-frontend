import { ACTIONS } from '../action-types';
import { progressReducer } from '@store/hor';
import { MODULE, OVERVIEW } from '../../constants';

export const reducer = (
    state = null,
    action,
) => {
    if (action.type === ACTIONS.OVERVIEW.FETCH) {
        return [
            ...action.payload
        ];
    }

    if (action.type === ACTIONS.OVERVIEW.ADD_TO_LIST) {
        if (state) {
            return state.concat(action.payload);
        }

        return [...action.payload];
    }

    return state;
};

export const overviewReducer = progressReducer({
    entityType: `${MODULE}/${OVERVIEW}`
}, reducer);
