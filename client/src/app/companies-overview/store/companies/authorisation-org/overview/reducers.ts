import { ACTIONS } from '../../action-types';
import { MODULE, AUTHORISATION_ORG } from '../../constants';
import { OVERVIEW } from '../action-types';
import { progressReducer } from '@store/hor';

export const reducer = (
    state = null,
    action,
) => {
    if (action.type === ACTIONS.AUTHORISATION_ORG.OVERVIEW.FETCH) {
        return action.payload;
    }

    return state;
};

export const OverviewReducer = progressReducer(
    { entityType: `${MODULE}/${AUTHORISATION_ORG}/${OVERVIEW}` },
    reducer,
);
