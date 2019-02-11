import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select$ } from '@angular-redux/store';
import { Observable, combineLatest, timer } from 'rxjs';
import { map, tap, filter, skipUntil } from 'rxjs/operators';

const handle = (obs$) => {
    return obs$
        .pipe(
            tap((user) => console.log(user)),
            filter((user: any) => {
                return user.loading === false;
            }),
            map((user: any) => !!user.result),
            tap((user) => console.log(user)),
        );
};


@Injectable()
export class AuthGuard implements CanActivate {
    @select$(['auth', 'user'], handle) private isLoggedIn$: Observable<any>;

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isLoggedIn$
            .pipe(
                tap((res) => {
                    if (!res) {
                        this.router.navigate(['/', 'auth']);
                    }
                })
            );
    }
}
