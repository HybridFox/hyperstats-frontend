import { RecyclersSelector } from './recyclers/selectors';
import { OrganisationsSelector } from './organisations/selectors';

export const CompaniesOverviewSelector = {
  recyclers: RecyclersSelector,
  organisations: OrganisationsSelector,
};
