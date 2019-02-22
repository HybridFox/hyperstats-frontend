import { progressReducer } from '@store/hor';

import { MODULE, OVERVIEW, DETAIL, ACTIONS } from './action-types';

const OverviewReducer = (
    state = null,
    action,
) => {
    if (action.type === ACTIONS.OVERVIEW.FETCH) {
        return action.payload;
    }

    return state;
};

const DetailReducer = (
    state = null,
    action,
) => {
    if (action.type === ACTIONS.DETAIL.FETCH) {
        return action.payload;
    }

    return state;
};


export const ReducerConfig = {
    overview: progressReducer(
        { entityType: `${MODULE}/${OVERVIEW}` },
        OverviewReducer,
    ),
    detail: progressReducer(
        { entityType: `${MODULE}/${DETAIL}` },
        DetailReducer,
    ),
};
