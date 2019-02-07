import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const detail = selectDenormalized({
  schema: schema.recyclingPartner,
  selector: 'recyclingPartners.detail.result',
});

export const detailLoading = ['recyclingPartners', 'detail', 'loading'];
export const detailError = ['recyclingPartners', 'detail', 'error'];
