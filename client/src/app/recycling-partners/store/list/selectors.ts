import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

// export const list = selectDenormalized({
//   schema: schema.recyclingProcess,
//   selector: 'recyclingProcesses.list.result',
// });

export const list = ['recyclingPartners', 'list', 'result'];
export const listLoading = ['recyclingPartners', 'list', 'loading'];
export const listError = ['recyclingPartners', 'list', 'error'];
