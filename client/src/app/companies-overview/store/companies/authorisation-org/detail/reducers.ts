import { ACTIONS } from '../../action-types';
import { MODULE, RECYCLERS } from '../../constants';
import { DETAIL } from '../action-types';
import { progressReducer } from '@store/hor';

const reducer = (
    state = null,
    action,
) => {
    if (action.type === ACTIONS.RECYCLERS.DETAIL.FETCH) {
        return action.payload;
    }

    return state;
};

export const DetailReducer = progressReducer(
    { entityType: `${MODULE}/${RECYCLERS}/${DETAIL}` },
    reducer,
);
