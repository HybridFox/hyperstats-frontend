import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const ReportsSelector = {
  loading: ['cds', 'endpoint', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.user,
    path: 'reports.result',
  })
};
