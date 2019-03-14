import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, select$ } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AuthActions } from '@store/auth';
import { LanguageService } from '../../services';

import { UserInterface } from '@store/auth/auth.interface';

const debounce = obs$ => obs$.pipe(
  debounceTime(1000),
);

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
})
export class CoreComponent implements OnInit {
  @select(['auth', 'user', 'result']) public user$: Observable<UserInterface>;
  @select$(['auth', 'user', 'loading'], debounce) public loading$: Observable<any>;

  constructor(
    private languageService: LanguageService,
    private authActions: AuthActions,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.languageService.initLanguage();
    this.authActions.fetchProfile().toPromise().catch(() => {});
  }
}
