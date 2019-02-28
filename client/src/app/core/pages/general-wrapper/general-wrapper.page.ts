import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { AuthActions } from '@store/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  templateUrl: './general-wrapper.page.html',
})
export class GeneralWrapperPageComponent {
  @select(['auth', 'user', 'result']) public user$: Observable<any>;

  constructor (
    private authActions: AuthActions,
    private router: Router,
  ) {}

  public onLogout() {
    this.authActions.logout()
      .toPromise()
      .then(() => {
        this.router.navigate(['/', 'auth']);
      });
  }
}
