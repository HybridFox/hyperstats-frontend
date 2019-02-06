import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';

import { Handler } from '@store/handler';
import { EntitiesActions } from '@store/entities';

import { UsersRepository } from './repository';
import { ACTIONS } from './action-types';

@Injectable()
export class UsersActions {
    constructor(
        private handler: Handler,
        private entitiesActions: EntitiesActions,
        private usersRepository: UsersRepository,
    ) { }

    public fetchAll(): Observable<any> {
        this.handler.dispatchStart(ACTIONS.OVERVIEW.FETCH);

        return this.usersRepository.fetchAll()
            .pipe(
                catchError((error) => {
                    this.handler.dispatchError(ACTIONS.OVERVIEW.FETCH, {
                      message: error.message,
                    });

                    return throwError(error);
                }),
                tap((response) => {
                    this.handler.dispatchSuccess(ACTIONS.OVERVIEW.FETCH, {
                        payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.user]),
                        pagination: null,
                    });
                }),
                finalize(() => {
                    this.handler.dispatchDone(ACTIONS.OVERVIEW.FETCH);
                })
            );
    }
}
