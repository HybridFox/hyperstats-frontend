import { UsersActions } from './users/actions';
export { UsersActions } from './users/actions';
import { UsersRepository } from './users/repository';
export { UsersRepository } from './users/repository';

import { ReducerConfig as UserReducer } from './users/reducer';
import { ReducerConfig as CompanyReducer } from './companies/reducer';
import { combineReducers } from 'redux';
import { UserCompanyActions } from './companies/actions';
import { UserCompanyRepository } from './companies/repository';
export { UserSelector } from './users/selectors';

export const Services = [
    UserCompanyActions,
    UserCompanyRepository,
    UsersActions,
    UsersRepository,
];

export const Reducer = combineReducers({
    ...UserReducer,
    ...CompanyReducer
});
