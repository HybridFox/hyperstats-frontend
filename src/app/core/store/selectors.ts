import {
  groups,
  groupsLoading,
  groupsError,
} from './groups/selectors';

import {
  monitor,
  monitorLoading,
  monitorError,
} from './monitor/selectors';

export const CoreSelectors = {
  groups: {
    result: groups,
    loading: groupsLoading,
    error: groupsError,
  },
  monitor: {
    result: monitor,
    loading: monitorLoading,
    error: monitorError,
  },
};
