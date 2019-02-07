import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const detail = selectDenormalized({
  schema: schema.recyclingProcess,
  selector: 'recyclingProcesses.detail.result',
});

export const detailLoading = ['recyclingProcesses', 'detail', 'loading'];
export const detailError = ['recyclingProcesses', 'detail', 'error'];
