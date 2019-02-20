import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const ReportsProcessSelector = {
  recyclingProcesses: selectDenormalized({
    schema: schema.recyclingProcess,
    selector: 'reports.recyclingProcesses.result',
  })
};
