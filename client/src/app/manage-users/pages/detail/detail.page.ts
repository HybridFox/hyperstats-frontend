import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersActions } from '../../store/users/actions';
import { UserSelector } from '../../store/users/selectors';

@Component({
    templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
    @select(UserSelector.detail.result) public user$: Observable<any>;
    @select(UserSelector.detail.loading) public loading$: Observable<boolean>;

    private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        public route: ActivatedRoute,
        public usersActions: UsersActions,
    ) {}

    public ngOnInit() {
        this.route.params
        .pipe(
            takeUntil(this.componentDestroyed$),
        )
        .subscribe(({ id }) => {
            this.usersActions.fetchById(id).subscribe();
        });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
