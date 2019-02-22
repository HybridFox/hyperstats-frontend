import { ACTIONS } from '../action-types';
import { progressReducer } from '@store/hor';
import { DETAIL, MODULE } from '../../constants';

const reducer = (
    state = null,
    action,
) => {
    if (action.type === ACTIONS.DETAIL.FETCH) {
        return action.payload;
    }

    return state;
};

export const detailReducer = progressReducer({
    entityType: `${MODULE}/${DETAIL}`
}, reducer);
