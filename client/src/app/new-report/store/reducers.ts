import { combineReducers } from 'redux';
import { recyclingProcessesReducer } from './recycling-processes/reducers';

export const newReportReducer = combineReducers({
  recyclingProcesses: recyclingProcessesReducer
});
