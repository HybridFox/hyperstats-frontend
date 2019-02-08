import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthActions } from '@store/auth/auth.actions';

@Component({
  templateUrl: './wrapper.page.html',
})
export class WrapperPageComponent {
  @select(['auth', 'user', 'result']) public user$: Observable<any>;

  constructor (
    private authActions: AuthActions,
    private router: Router,
  ) {}

  public onLogout() {
    this.authActions.logout();
    this.router.navigate(['/', 'auth']);
  }
}
