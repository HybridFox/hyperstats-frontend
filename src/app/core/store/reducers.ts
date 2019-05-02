import { combineReducers } from 'redux';
import { groupsReducer } from './groups/reducers';
import { dashboardMonitorReducer } from './dashboard-monitor/reducers';
import { monitorReducer } from './monitor/reducers';

export const coreReducer = combineReducers({
  groups: groupsReducer,
  dashboardMonitor: dashboardMonitorReducer,
  monitor: monitorReducer,
});
