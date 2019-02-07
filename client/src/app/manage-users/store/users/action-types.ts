export const MODULE = 'MANAGE_USERS';
export const OVERVIEW = 'OVERVIEW';
export const DETAIL = 'DETAIL';

export const OVERVIEW_ACTIONS = {
    FETCH: `${MODULE}/${OVERVIEW}/FETCH`,
    CLEAR: `${MODULE}/${OVERVIEW}/CLEAR`,
};

export const DETAIL_ACTIONS = {
    FETCH: `${MODULE}/${DETAIL}/FETCH`,
    CLEAR: `${MODULE}/${DETAIL}/CLEAR`,
};

export const ACTIONS = {
    OVERVIEW: OVERVIEW_ACTIONS,
    DETAIL: DETAIL_ACTIONS,
};
