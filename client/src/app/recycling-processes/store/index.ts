export * from './actions';
export * from './reducers';
export * from './selectors';

import { RecyclingProcessesActions } from './actions';
import { RecyclingProcessesRepository } from './repository';

export const RecylingProcessesServices = [
  RecyclingProcessesActions,
  RecyclingProcessesRepository
];
