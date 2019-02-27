import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select$ } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

const handle = (obs$) => {
  return obs$
      .pipe(
          filter((user: any) => {
              return !user || user.loading === false;
          }),
          map((user: any) => {
            if (user) {
              return user.result.status.type;
            }
          }),
      );
};

@Injectable()
export class ValidationGuard implements CanActivate {
  @select$(['auth', 'user'], handle) private isValidated$: Observable<any>;

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.isValidated$
            .pipe(
                map((user) => {
                  if (user !== 'ACTIVATED') {
                    return false;
                  } else {
                    return true;
                  }
                }),
                tap((res) => {
                    if (!res) {
                      return this.router.navigate(['/', 'validation']);
                    }
                })
            );
    }
}
