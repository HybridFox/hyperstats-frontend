import {
  detailLoading,
  detail,
  detailError
} from './detail/selectors';

import {
  list,
  listLoading,
  listError,
} from './list/selectors';

import {
  companies,
  companiesLoading,
  companiesError,
} from './companies/selectors';

export const ReportsSelector = {
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
  companies: {
    result: companies,
    loading: companiesLoading,
    error: companiesError,
  },
};
