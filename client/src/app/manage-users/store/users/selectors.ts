import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const OverviewSelector = {
  loading: ['user-management', 'overview', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.user,
    selector: 'user-management.overview.result',
  }),
};

export const DetailSelector = {
  loading: ['user-management', 'detal', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.user,
    selector: 'user-management.detail.result',
  }),
};

export const UserSelector = {
  overview: OverviewSelector,
  detail: DetailSelector,
};
