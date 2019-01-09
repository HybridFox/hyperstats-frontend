import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services';
import { ActionButton } from '@ui/menu/menu.types';
import { NgRedux } from '@angular-redux/store';
import { AuthActions } from '@store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
})
export class CoreComponent implements OnInit {
  title = 'rare';
  public actionButton: ActionButton = {label: 'New report'};
  public user: any;

  constructor(
    private languageService: LanguageService,
    private ngRedux: NgRedux<any>,
    private authActions: AuthActions,
  ) {}

  public ngOnInit() {
    this.languageService.initLanguage();
    this.ngRedux.select(['auth', 'user', 'result']).subscribe((user) => {
      this.user = user;
    });
  }

  public logout() {
    this.authActions.logout();
  }
}
