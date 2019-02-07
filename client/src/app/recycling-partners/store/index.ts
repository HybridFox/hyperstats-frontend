export * from './actions';
export * from './reducers';
export * from './selectors';

import { RecyclingPartnerActions } from './actions';
import { RecyclingPartnerRepository } from './repository';

export const recyclingPartnersServices = [
  RecyclingPartnerActions,
  RecyclingPartnerRepository
];
