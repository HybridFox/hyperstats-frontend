import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable, combineLatest } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    @select(['auth', 'user', 'result']) private user$: Observable<any>;
    @select(['auth', 'user', 'loading']) private loading$: Observable<any>;

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return combineLatest(
            this.user$,
            this.loading$
        )
            .pipe(
                filter(([user, loading]) => {
                    return loading === false;
                }),
                map(([user]) => {
                    return !!user;
                }),
                tap((val) => {
                    if (!val) {
                        this.router.navigate(['/', 'login']);
                    }
                })
            );
    }
}
