import { Component, OnInit } from '@angular/core';
import { CoreActions, CoreSelectors } from '../../store';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './dashboard.page.html'
})
export class DashboardPageComponent implements OnInit {
  @select(CoreSelectors.groups.result) public data$: Observable<any>;
  @select(CoreSelectors.groups.loading) public loading$: Observable<boolean>;

  constructor(private coreActions: CoreActions) { }
  public range: any;
  public autorefresh = true;
  public interval;

  ngOnInit() {
    this.fetch();

    this.interval = setInterval(this.fetch.bind(this), 60000);
  }

  trackByFn(index, item) {
    return item.id;
  }

  handleRefresh() {
    this.fetch();
  }

  handleRangeUpdate(range) {
    this.range = range;
  }

  handleAutorefreshUpdate(autorefreshEnabled) {
    console.log('autorefresh', autorefreshEnabled);
    this.autorefresh = autorefreshEnabled;

    if (autorefreshEnabled) {
      this.interval = setInterval(this.fetch.bind(this), 60000);
      this.fetch();
    } else {
      clearInterval(this.interval);
      this.fetch();
    }
  }

  private fetch() {
    this.coreActions.fetchAllGroups(true, this.autorefresh ? null : this.range)
      .subscribe();
  }
}
