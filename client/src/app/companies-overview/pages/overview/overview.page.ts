import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CompaniesOverviewActions, CompaniesOverviewSelector } from '../../store';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit, OnDestroy {
    @select(CompaniesOverviewSelector.recyclers.overview.result) public companies$: Observable<any>;
    @select(CompaniesOverviewSelector.recyclers.overview.loading) public loading$: Observable<boolean>;
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
      private route: ActivatedRoute,
      private companiesActions: CompaniesOverviewActions,
  ) {}

    public ngOnInit() {
      this.route.queryParams
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe((params) => {
                this.companiesActions.fetchAllRecyclers().toPromise();
                this.companiesActions.fetchAllAuthorisationOrg().toPromise();
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
