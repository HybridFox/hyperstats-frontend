import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { CompaniesActions } from '../../store/companies/actions';
import { CompanySelector } from '../../store/companies/selectors';
import { CompanyType } from '../../store/companies/types';

@Component({
    templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit {
    @select(CompanySelector.overview.result) public companies$: Observable<any>;
    @select(CompanySelector.overview.loading) public loading$: Observable<boolean>;

    constructor(
        public companiesActions: CompaniesActions,
    ) {}

    public ngOnInit() {
        this.companiesActions.fetchByType(CompanyType.R).subscribe();
    }
}
