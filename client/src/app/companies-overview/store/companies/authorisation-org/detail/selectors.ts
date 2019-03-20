import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const DetailSelector = {
  loading: ['companies-overview', 'authorisationOrg', 'detail', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.company,
    selector: 'companies-overview.authorisationOrg.detail.result',
  }),
};
