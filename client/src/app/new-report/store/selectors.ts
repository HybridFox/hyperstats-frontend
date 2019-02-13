import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const NewReportSelector = {
  recyclingProcesses: selectDenormalized({
    schema: schema.recyclingProcess,
    selector: 'newReport.recyclingProcesses.result',
  })
};
