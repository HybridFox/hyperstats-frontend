import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { AuthActions } from '@store/auth';
import { LanguageService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
})
export class CoreComponent implements OnInit {
  @select(['auth', 'user', 'result']) public user$: Observable<any>;
  @select(['auth', 'user', 'loading']) public loading$: Observable<any>;
  public actionButton = { label: 'New report', link: '/new-report' };

  constructor(
    private languageService: LanguageService,
    private authActions: AuthActions,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.languageService.initLanguage();
    this.authActions.fetchProfile().subscribe(() => {}, () => {});
  }

  public logout() {
    this.authActions.logout()
      .then(() => {
        this.router.navigate(['/login']);
      });
  }
}
