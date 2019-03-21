import { ACTIONS } from '../../action-types';
import { MODULE, ORGANISATIONS } from '../../constants';
import { DETAIL } from '../action-types';
import { progressReducer } from '@store/hor';

const reducer = (
    state = null,
    action,
) => {
    if (action.type === ACTIONS.ORGANISATIONS.DETAIL.FETCH) {
        return action.payload;
    }

    return state;
};

export const DetailReducer = progressReducer(
    { entityType: `${MODULE}/${ORGANISATIONS}/${DETAIL}` },
    reducer,
);
