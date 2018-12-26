import { Injectable } from '@angular/core';
import { catchError, tap, finalize } from 'rxjs/operators';
import { throwError as _throw, Observable } from 'rxjs';

import { Handler } from '@store/handler';
import { EntitiesActions } from '@store/entities';

import { ACTIONS } from './auth.action-types';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthActions {
  constructor(
    private authRepository: AuthRepository,
    private handler: Handler,
    private entitiesActions: EntitiesActions
  ) {}

  public login({ email, password }): Observable<any> {
    this.handler.dispatchStart(ACTIONS.LOGIN_USER);

    return this.authRepository
      .login({ email, password })
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.LOGIN_USER, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.LOGIN_USER, {
            payload: this.entitiesActions.normalize(response, EntitiesActions.schema.user)
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.LOGIN_USER);
        }),
      );
  }

  public register({ firstname, lastname, email, password }): Observable<any>  {
    this.handler.dispatchStart(ACTIONS.REGISTER_USER);

    return this.authRepository
      .register({ firstname, lastname, email, password })
      .pipe(
        catchError((error) => {
          this.handler.dispatchError(ACTIONS.REGISTER_USER, {
            message: error.message,
          });

          return _throw(error);
        }),
        tap((response: any) => {
          this.handler.dispatchSuccess(ACTIONS.REGISTER_USER, {
            payload: this.entitiesActions.normalize(response, EntitiesActions.schema.user)
          });
        }),
        finalize(() => {
          this.handler.dispatchDone(ACTIONS.REGISTER_USER);
        }),
      );
  }

  public isLoggedIn() {
    return true;
  }
}
