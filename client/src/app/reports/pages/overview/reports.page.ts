import { Component, OnInit } from '@angular/core';
import { ReportsProcessActions, ReportsProcessSelector } from '../../store/recycling-processes';
import { select, select$ } from '@angular-redux/store';
import { mapRecyclingProcessesToMenuItemsWithAll } from '../../services/select.helpers';
import { Observable, Subject } from 'rxjs';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { ReportsActions, ReportsSelector } from '../../store/reports';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './reports.page.html',
})
export class ReportsPageComponent implements OnInit {
    @select(ReportsSelector.list.result) public reports$: Observable<any>;
    @select(ReportsSelector.list.loading) public reportsLoading$: Observable<boolean>;
    @select$(
        ReportsProcessSelector.list.result,
        mapRecyclingProcessesToMenuItemsWithAll
    ) public menuItems$: Observable<MenuItem>;

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private reportsActions: ReportsActions,
        private reportsProcessActions: ReportsProcessActions,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
      this.activatedRoute.queryParams
        .pipe(
          takeUntil(this.componentDestroyed$)
        )
        .subscribe(params => {
          this.reportsActions.fetchAll({
            processId: params.recyclingProcess
          }).toPromise();
        });

      this.reportsProcessActions.fetchAllRecyclingProcesses().toPromise();
    }
}
