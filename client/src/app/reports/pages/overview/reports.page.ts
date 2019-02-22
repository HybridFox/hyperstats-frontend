import { Component, OnInit } from '@angular/core';
import { ReportsProcessActions, ReportsProcessSelector } from '../../store/recycling-processes';
import { select, select$ } from '@angular-redux/store';
import { mapRecyclingProcessesToMenuItemsWithAll } from '../../services/select.helpers';
import { Observable } from 'rxjs';
import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { ReportsActions, ReportsSelector } from '../../store/reports';

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

    constructor(
        private reportsActions: ReportsActions,
        private reportsProcessActions: ReportsProcessActions
    ) {}

    ngOnInit() {
        this.reportsActions.fetchAll().toPromise();
        this.reportsProcessActions.fetchAllRecyclingProcesses().toPromise();
    }
}
