import {
  detail,
  detailLoading,
  detailError,
} from './detail/selectors';

import {
  list,
  listLoading,
  listError,
} from './list/selectors';

export const RecyclingPartnerSelector = {
  detail: {
    result: detail,
    loading: detailLoading,
    error: detailError,
  },
  list: {
    result: list,
    loading: listLoading,
    error: listError,
  },
};
