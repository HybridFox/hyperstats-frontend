export * from './auth.actions';
export * from './auth.reducer';
export * from './auth.selectors';

import { AuthActions } from './auth.actions';
import { AuthRepository } from './auth.repository';

export const AuthServices = [
  AuthActions,
  AuthRepository,
];
