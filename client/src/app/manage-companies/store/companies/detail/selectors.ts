import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const DetailSelector = {
  loading: ['company-management', 'detail', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.company,
    selector: 'company-management.detail.result',
  }),
};
