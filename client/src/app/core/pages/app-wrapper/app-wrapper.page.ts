import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthActions } from '@store/auth/auth.actions';

@Component({
  templateUrl: './app-wrapper.page.html',
})
export class AppWrapperPageComponent {
  @select(['auth', 'user', 'result']) public user$: Observable<any>;
  public actionButton = { label: 'New report', link: ['/', 'recycler', 'new-report'] };

  constructor (
    private authActions: AuthActions,
    private router: Router,
  ) {}

  public onLogout() {
    this.authActions.logout().toPromise().then(() => {
      this.router.navigate(['/', 'auth']);
    });
  }
}
