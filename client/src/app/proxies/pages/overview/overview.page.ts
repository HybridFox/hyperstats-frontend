import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './overview.page.html',
})
export class OverviewPageComponent {
  @select(['auth', 'user', 'result']) private user$: Observable<any>;
}
