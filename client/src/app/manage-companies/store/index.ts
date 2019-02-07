import { CompaniesActions } from './companies/actions';
export { CompaniesActions } from './companies/actions';
import { CompaniesRepository } from './companies/repository';
export { CompaniesRepository } from './companies/repository';

export { Reducer } from './companies/reducer';
export { CompanySelector } from './companies/selectors';

export const Services = [
    CompaniesActions,
    CompaniesRepository,
];
