import { MODULE, RECYCLERS } from '../constants';
export const DETAIL = 'DETAIL';
export const OVERVIEW = 'OVERVIEW';

export const OVERVIEW_ACTIONS = {
    FETCH: `${MODULE}/${RECYCLERS}/${OVERVIEW}/FETCH`,
};

export const DETAIL_ACTIONS = {
    FETCH: `${MODULE}/${RECYCLERS}/${DETAIL}/FETCH`,
};

export const RECYCLERS_ACTIONS = {
  OVERVIEW: OVERVIEW_ACTIONS,
  DETAIL: DETAIL_ACTIONS
};
