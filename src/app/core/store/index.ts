export * from './actions';
export * from './reducers';
export * from './selectors';
export * from './repository';

import { CoreActions } from './actions';
import { CoreRepository } from './repository';

export const CoreServices = [
  CoreActions,
  CoreRepository
];
