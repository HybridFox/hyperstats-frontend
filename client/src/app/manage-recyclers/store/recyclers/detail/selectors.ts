import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const DetailSelector = {
  loading: ['recyclers-management', 'detail', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.company,
    selector: 'recyclers-management.detail.result',
  }),
};
