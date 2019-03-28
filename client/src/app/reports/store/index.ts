import { ReportsActions } from './reports';
import { ReportsProcessActions } from './recycling-processes';
import { ReportsRepository } from '@api/reports';
import { RecyclingProcessesRepository } from '@api/recycling-processes';
import { RecyclingPartnerActions } from 'src/app/recycling-partners/store';

export const ReportsStoreServices = [
  ReportsActions,
  ReportsProcessActions,
  ReportsRepository,
  RecyclingProcessesRepository,
  RecyclingPartnerActions
];

export { Reducers } from './reducers';
