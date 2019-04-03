import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { isNil } from 'ramda';

import { AuthSelector } from '@store/auth';
import { UserInterface } from '@store/auth/auth.interface';

@Injectable()
export class OrganisationGuard implements CanActivate {
  @select(AuthSelector.user.result) user$: Observable<UserInterface>;

  constructor(
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.user$
      .pipe(
        filter((user: UserInterface) => !isNil(user)),
        map((user) => {
          if (user.company.meta.type === 'R' && route.routeConfig.path === 'recycler') {
            return true;
          }

          if (user.company.meta.type !== 'CO' && user.company.meta.type !== 'AO') {
            this.router.navigate(['/']);

            return false;
          }

          if (user.company.meta.type === 'CO' &&
            (route.routeConfig.path === 'authorisation-organisation' || route.routeConfig.path === 'recycler')) {
            this.router.navigate(['/']);

            return false;
          }

          if (user.company.meta.type === 'AO' &&
            (route.routeConfig.path === 'compliance-organisation' || route.routeConfig.path === 'recycler')) {
            this.router.navigate(['/']);

            return false;
          }

          return true;
        })
      );
  }
}
