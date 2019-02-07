import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CompaniesActions } from '../../store/companies/actions';
import { CompanySelector } from '../../store/companies/selectors';

@Component({
    templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
    @select(CompanySelector.detail.result) public company$: Observable<any>;
    @select(CompanySelector.detail.loading) public loading$: Observable<boolean>;

    private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        public route: ActivatedRoute,
        public companiesActions: CompaniesActions,
    ) {}

    public ngOnInit() {
        this.route.params
        .pipe(
            takeUntil(this.componentDestroyed$),
        )
        .subscribe(({ id }) => {
            this.companiesActions.fetchById(id).subscribe();
        });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
