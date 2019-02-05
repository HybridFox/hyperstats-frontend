import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

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

    public fetchAll() {
        this.handler.dispatchStart(ACTIONS.OVERVIEW.FETCH);

        return this.usersRepository.fetchAll()
            .pipe(
                tap((response) => {
                    this.handler.dispatchSuccess(ACTIONS.OVERVIEW.FETCH, {
                        payload: this.entitiesActions.normalize(response, [EntitiesActions.schema.user]),
                        pagination: null,
                    });
                }),
            );
    }
}
