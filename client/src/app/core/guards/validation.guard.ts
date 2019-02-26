import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, select$ } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { AuthSelector } from '@store/auth';

const handle = (obs$) => {
  return obs$
      .pipe(
          filter((user: any) => {
              return !user || user.loading === false;
          }),
          map((user: any) => {
            return !!user.result;
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
                tap((res) => {
                    if (!res) {
                      this.router.navigate(['/auth/validation']);
                    }
                })
            );
    }
}
