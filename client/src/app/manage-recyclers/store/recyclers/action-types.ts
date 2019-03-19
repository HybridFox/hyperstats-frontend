export const MODULE = 'MANAGE_RECYCLERS';
export const OVERVIEW = 'OVERVIEW';
export const DETAIL = 'DETAIL';

export const OVERVIEW_ACTIONS = {
    FETCH: `${MODULE}/${OVERVIEW}/FETCH`,
};

export const DETAIL_ACTIONS = {
    FETCH: `${MODULE}/${DETAIL}/FETCH`,
};

export const ACTIONS = {
    OVERVIEW: OVERVIEW_ACTIONS,
    DETAIL: DETAIL_ACTIONS,
};
