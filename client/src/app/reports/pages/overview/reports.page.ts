import { Component, OnInit } from '@angular/core';
import { ReportsProcessActions, ReportsProcessSelector } from '../../store/recycling-processes';
import { select, select$ } from '@angular-redux/store';
import { mapRecyclingProcessesToMenuItems } from '../../services/select.helpers';
import { Observable } from 'rxjs';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { ReportsActions, ReportsSelector } from '../../store/reports';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './reports.page.html',
})
export class ReportsPageComponent implements OnInit {
    @select(ReportsSelector.list.result) public reports$: Observable<any>;
    @select(ReportsSelector.list.loading) public reportsLoading$: Observable<boolean>;
    @select$(
        ReportsProcessSelector.list.result,
        mapRecyclingProcessesToMenuItems
    ) public menuItems$: Observable<MenuItem>;

    constructor(
        private reportsActions: ReportsActions,
        private reportsProcessActions: ReportsProcessActions,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
      this.activatedRoute.queryParams.subscribe(params => {
        const id = params['recyclingProcess'];
        this.reportsActions.fetchAll(id).toPromise();
      });

      this.reportsProcessActions.fetchAllRecyclingProcesses().toPromise();
    }
}
