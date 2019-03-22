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
    @select(CompaniesOverviewSelector.recyclers.overview.result) public recyclers$: Observable<any>;
    @select(CompaniesOverviewSelector.organisations.overview.result) public organisations$: Observable<any>;
    @select(CompaniesOverviewSelector.recyclers.overview.loading) public loading$: Observable<boolean>;

    public companies$: Observable<any>;
    public page: string;

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
      private route: ActivatedRoute,
      private companiesOverviewActions: CompaniesOverviewActions,
    ) {}

    public ngOnInit() {
      this.route.queryParams
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe((params) => {
                if (this.route.snapshot['_routerState'].url === '/compliance-organisation/authorisation-org') {
                  this.companiesOverviewActions.fetchAllAuthorisationOrg().toPromise();
                  this.companies$ = this.organisations$;
                  this.page = 'authorisation-org';
                }
                if (this.route.snapshot['_routerState'].url.includes('/recyclers')) {
                  this.companiesOverviewActions.fetchAllRecyclers().toPromise();
                  this.companies$ = this.recyclers$;
                  this.page = 'recyclers';
                }
                if (this.route.snapshot['_routerState'].url === '/authorisation-organisation/compliance-org') {
                  this.companiesOverviewActions.fetchAllComplianceOrg().toPromise();
                  this.companies$ = this.organisations$;
                  this.page = 'compliance-org';
                }
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
