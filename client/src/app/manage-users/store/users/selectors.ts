import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const UserSelector = {
  loading: ['user-management', 'overview', 'loading'],
  result: selectDenormalized({
    relations: ['roles'],
    schema: schema.user,
    selector: 'user-management.overview.result',
  })
};
