import {
  list,
  listLoading,
  listError,
} from './list/selectors';

export const ProxiesSelectors = {
  list: {
    result: list,
    loading: listLoading,
    error: listError,
  },
};
