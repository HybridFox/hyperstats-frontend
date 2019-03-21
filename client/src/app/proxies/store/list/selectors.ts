import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const list = selectDenormalized({
  schema: schema.proxy,
  selector: 'proxies.list.result',
});

export const listLoading = ['proxies', 'list', 'loading'];
export const listError = ['proxies', 'list', 'error'];
