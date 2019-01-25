import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const list = selectDenormalized({
  schema: schema.recyclingProcess,
  selector: 'recyclingProcesses.list.result',
});

export const listLoading = ['customsOffices', 'list', 'loading'];
export const listError = ['customsOffices', 'list', 'error'];
