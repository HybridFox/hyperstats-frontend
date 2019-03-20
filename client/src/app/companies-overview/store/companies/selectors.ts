import { RecyclersSelector } from './recyclers/selectors';
import { AuthorisationOrgSelector } from './authorisation-org/selectors';

export const CompaniesOverviewSelector = {
  recyclers: RecyclersSelector,
  authorisationOrg: AuthorisationOrgSelector,
};
