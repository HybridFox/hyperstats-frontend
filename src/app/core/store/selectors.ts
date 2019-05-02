import {
  groups,
  groupsLoading,
  groupsError,
} from './groups/selectors';

import {
  dashboardMonitor,
  dashboardMonitorLoading,
  dashboardMonitorError,
} from './dashboard-monitor/selectors';

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
  dashboardMonitor: {
    result: dashboardMonitor,
    loading: dashboardMonitorLoading,
    error: dashboardMonitorError,
  },
  monitor: {
    result: monitor,
    loading: monitorLoading,
    error: monitorError,
  },
};
