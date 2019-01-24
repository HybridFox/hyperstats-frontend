import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const detail = selectDenormalized({
  schema: schema.recyclingProcess,
  selector: 'recyclingProcesses.detail.result',
});

export const detailLoading = ['customsOffices', 'detail', 'loading'];
export const detailError = ['customsOffices', 'detail', 'error'];
