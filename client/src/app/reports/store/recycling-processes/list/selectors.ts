import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const listPath = ['reports', 'recyclingProcesses', 'list', 'result'];
export const list = selectDenormalized({
  schema: schema.recyclingProcess,
  selector: listPath.join('.'),
});

export const listLoading = ['reports', 'recyclingProcesses', 'list', 'loading'];
export const listError = ['reports', 'recyclingProcesses', 'list', 'error'];
