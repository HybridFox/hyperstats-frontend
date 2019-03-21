import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const OverviewSelector = {
  loading: ['companies-overview', 'organisations', 'overview', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.company,
    selector: 'companies-overview.organisations.overview.result',
  }),
};
