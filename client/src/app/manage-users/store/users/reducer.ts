import { combineReducers } from 'redux';
import { progressReducer } from '@store/hor';

import { MODULE, OVERVIEW, ACTIONS } from './action-types';

const OverviewReducer = (
    state = null,
    action,
) => {
    if (action.type === ACTIONS.OVERVIEW.FETCH) {
        return action.payload;
    }

    return state;
};


export const Reducer = combineReducers({
    overview: progressReducer(
        { entityType: `${MODULE}/${OVERVIEW}` },
        OverviewReducer,
    ),
});
