import { combineReducers } from 'redux';
import { groupsReducer } from './groups/reducers';
import { monitorReducer } from './monitor/reducers';

export const coreReducer = combineReducers({
  groups: groupsReducer,
  monitor: monitorReducer,
});
