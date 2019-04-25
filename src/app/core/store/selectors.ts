import {
  list,
  listLoading,
  listError,
} from './list/selectors';

export const CoreSelectors = {
  list: {
    result: list,
    loading: listLoading,
    error: listError,
  },
};
