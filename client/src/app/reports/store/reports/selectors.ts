import {
  detailLoading,
  detail,
  detailError
} from './detail/selectors';

import {
  overview,
  overviewLoading,
  overviewError,
} from './overview/selectors';

export const ReportsSelector = {
  detail: {
    result: detail,
    loading: detailLoading,
    error: detailError,
  },
  overview: {
    result: overview,
    loading: overviewLoading,
    error: overviewError,
  },
};
