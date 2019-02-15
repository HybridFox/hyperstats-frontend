import { selectDenormalized } from '@store/utils/selector';
import * as schema from '@core/schemas';

export const ListSelector = {
  loading: ['user-management', 'companies', 'loading'],
  result: selectDenormalized({
    schema: schema.company,
    selector: 'user-management.companies.result',
  }),
};

export const UserCompanySelector = {
  list: ListSelector,
};
