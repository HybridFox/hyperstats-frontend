import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const OverviewSelector = {
  loading: ['company-management', 'overview', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.company,
    selector: 'company-management.overview.result',
  }),
};

export const DetailSelector = {
  loading: ['company-management', 'detail', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.company,
    selector: 'company-management.detail.result',
  }),
};

export const CompanySelector = {
  overview: OverviewSelector,
  detail: DetailSelector,
};
