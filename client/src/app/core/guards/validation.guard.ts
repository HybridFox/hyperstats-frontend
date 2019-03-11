import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select$ } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { STATUS_TYPES } from 'src/lib/constants';
import { StatusType } from 'src/app/manage-users/store/users/types';
import pathOr from 'ramda/es/pathOr';

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
    @select$(['auth', 'user'], handle) private isValidated$: Observable<any>;

    public statusTypes: any[] = STATUS_TYPES;

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.isValidated$
            .pipe(
                map((user) => user.status.type === this.statusTypes[0].type && user.company && user.validation.isValidated),
                tap((res) => {
                    if (!res) {
                      return this.router.navigate(['/', 'validation']);
                    }
                })
            );
    }
}
