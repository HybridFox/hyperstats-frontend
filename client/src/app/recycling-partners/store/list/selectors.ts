import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const list = selectDenormalized({
  schema: schema.recyclingPartner,
  selector: 'recyclingPartners.list.result',
});

export const listLoading = ['recyclingPartners', 'list', 'loading'];
export const listError = ['recyclingPartners', 'list', 'error'];
