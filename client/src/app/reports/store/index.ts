import { ReportsActions } from './reports';
import { ReportsProcessActions } from './recycling-processes';
import { ReportsRepository } from '@api/reports';
import { RecyclingProcessesRepository } from '@api/recycling-processes';

export const ReportsStoreServices = [
    ReportsActions,
    ReportsProcessActions,
    ReportsRepository,
    RecyclingProcessesRepository
];

export { Reducers } from './reducers';
