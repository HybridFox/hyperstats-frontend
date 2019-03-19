import { ACTIONS, MODULE, OVERVIEW } from '../action-types';
import { progressReducer } from '@store/hor';
import without from 'ramda/es/without';

export const reducer = (
    state = null,
    action,
) => {
    if (action.type === ACTIONS.OVERVIEW.FETCH) {
        return action.payload;
    }

    return state;
};

export const OverviewReducer = progressReducer(
    { entityType: `${MODULE}/${OVERVIEW}` },
    reducer,
);
