import { Component, OnInit } from '@angular/core';
import { CoreActions, CoreSelectors } from '../../store';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './dashboard.page.html'
})
export class DashboardPageComponent implements OnInit {
  @select(CoreSelectors.groups.result) public data$: Observable<any>;

  constructor(private coreActions: CoreActions) {}

  ngOnInit() {
    this.fetch();

    setInterval(this.fetch.bind(this), 60000)
  }

  trackByFn(index, item) {
    return item.id;
  }

  private fetch() {
    this.coreActions.fetchAllGroups()
      .pipe(
        first()
      ).subscribe();
  }
}
