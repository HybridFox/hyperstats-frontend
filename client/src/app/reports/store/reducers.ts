import { combineReducers } from 'redux';
import { reportsReducer } from './reports';
import { ReportsProcessReducer } from './recycling-processes';

export const Reducers = combineReducers({
  reports: reportsReducer,
  recyclingProcesses: ReportsProcessReducer
});
