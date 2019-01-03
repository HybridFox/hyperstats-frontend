import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';

import { ReportsActions, ReportsSelector } from '../../store';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports.page.html',
})
export class ReportsPageComponent implements OnInit {
  @select(ReportsSelector.result) public results$;

  constructor(
    private route: ActivatedRoute,
    private reportsActions: ReportsActions,
  ) {}

  public ngOnInit() {
    console.log('init page');
    this.reportsActions.fetchAll().subscribe();
  }
}
