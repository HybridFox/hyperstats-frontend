import { ReportsActions } from './reports';
import { ReportProcessActions } from './recycling-processes';
import { ReportsRepository } from '@api/reports';
import { RecyclingProcessesRepository } from '@api/recycling-processes';

export const ReportsStoreServices = [
    ReportsActions,
    ReportProcessActions,
    ReportsRepository,
    RecyclingProcessesRepository
];

export { Reducers } from './reducers';
