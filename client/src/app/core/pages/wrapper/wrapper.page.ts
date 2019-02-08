import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { AuthActions } from '@store/auth/auth.actions';

@Component({
  templateUrl: './wrapper.page.html',
})
export class WrapperPageComponent {
  @select(['auth', 'user', 'result']) public user$: Observable<any>;

  constructor (
    private authActions: AuthActions,
  ) {}

  public onLogout() {
    this.authActions.logout();
  }
}
