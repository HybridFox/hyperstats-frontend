import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { UserInterface } from '@store/auth/auth.interface';
import { ProxiesActions } from '../../store/actions';

@Component({
  templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit {
  @select(['auth', 'user', 'result']) public user$: Observable<UserInterface>;

  constructor(
    private proxiesActions: ProxiesActions,
  ) { }


  ngOnInit() {
    this.proxiesActions.fetchAll().toPromise();
  }
}
