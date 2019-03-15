import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select$ } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { STATUS_TYPES } from 'src/lib/constants';

const handle = (obs$) => {
  return obs$
      .pipe(
          filter((user: any) => {
              return !user || user.loading === false;
          }),
          map((user: any) => {
            if (user) {
              return user.result;
            }
          }),
      );
};

@Injectable()
export class ValidationGuard implements CanActivate {
    @select$(['auth', 'user'], handle) private user$: Observable<any>;

    public statusTypes = STATUS_TYPES;

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.user$
            .pipe(
                map((user) => user.status.type ===
                    this.statusTypes.ACTIVATED && (user.company || user.isAdmin) && user.validation.isValidated),
                tap((res) => {
                    if (!res) {
                      return this.router.navigate(['/', 'validation']);
                    }
                })
            );
    }
}
