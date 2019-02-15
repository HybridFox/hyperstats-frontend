import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const ReportProcessSelector = {
  recyclingProcesses: selectDenormalized({
    schema: schema.recyclingProcess,
    selector: 'newReport.recyclingProcesses.result',
  })
};
