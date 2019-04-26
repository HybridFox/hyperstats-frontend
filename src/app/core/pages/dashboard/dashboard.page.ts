import { Component, OnInit } from '@angular/core';
import { CoreActions, CoreSelectors } from '../../store';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './dashboard.page.html'
})
export class DashboardPageComponent implements OnInit {
  @select(CoreSelectors.groups.result) public data$: Observable<any>;

  single: any[];
  multi: any[];

  view: any[] = [undefined, 400];

  xAxisLabel = 'Time';
  yAxisLabel = 'Listeners';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private coreActions: CoreActions) {}

  ngOnInit() {
    this.coreActions.fetchAllGroups().subscribe();
  }
}
