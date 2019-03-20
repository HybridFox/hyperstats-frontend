import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const OverviewSelector = {
  loading: ['companies-overview', 'authorisationOrg', 'overview', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.company,
    selector: 'companies-overview.authorisationOrg.overview.result',
  }),
};
