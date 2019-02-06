import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map, tap, skip } from 'rxjs/operators';

import { AuthSelector } from '@store/auth';

@Injectable()
export class AdminGuard implements CanActivate {
    @select(AuthSelector.user.result) user$: Observable<any>;
    @select(AuthSelector.user.loading) loading$: Observable<any>;

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.user$
            .pipe(
                skip(1), // Todo: fix this
                map((user) => {
                    console.log(user);
                    return !!user;
                }),
                tap((result) => {
                    if (!result) {
                        return this.router.navigate(['/']);
                    }
                })
            );
    }
}
