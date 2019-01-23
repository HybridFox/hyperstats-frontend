import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const RecyclingProcessesSelector = {
  loading: ['cds', 'endpoint', 'loading'],
  result: selectDenormalized({
    schema: schema.recyclingProcess,
    selector: 'recyclingProcesses.result',
  })
};
