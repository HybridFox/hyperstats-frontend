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
  loading: ['user-management', 'detail', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.user,
    selector: 'user-management.detail.result',
  }),
};

export const RequestsSelector = {
  loading: ['user-management', 'requests', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.user,
    selector: 'user-management.requests.result',
  }),
};

export const UserSelector = {
  overview: OverviewSelector,
  detail: DetailSelector,
  requests: RequestsSelector,
};
