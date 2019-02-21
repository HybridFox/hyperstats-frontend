import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const detailPath = ['reports', 'recyclingProcesses', 'detail', 'result'];
export const detail = selectDenormalized({
  schema: schema.recyclingProcess,
  selector: detailPath.join('.'),
});

export const detailLoading = ['reports', 'recyclingProcesses', 'detail', 'loading'];
export const detailError = ['reports', 'recyclingProcesses', 'detail', 'error'];
