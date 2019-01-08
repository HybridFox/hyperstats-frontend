import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select } from '@angular-redux/store';

import { AuthActions, AuthSelector } from '@store/auth';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    @select(AuthSelector.user.result) user$;

    constructor(
        private router: Router,
        private authActions: AuthActions
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authActions.fetchProfile()
            .pipe(
                catchError(() => {
                    return of(false);
                }),
                map((value) => {
                    return !!value;
                }),
                tap((result) => {
                    if (!result) {
                        return this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    }
                })
            );
    }
}
