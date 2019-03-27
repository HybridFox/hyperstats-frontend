import {
  list,
  listLoading,
  listError,
} from './list/selectors';

export const AuditTrailSelectors = {
  list: {
    result: list,
    loading: listLoading,
    error: listError,
  },
};
