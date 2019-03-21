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
    @select(CompaniesOverviewSelector.authorisationOrg.overview.result) public authOrg$: Observable<any>;
    @select(CompaniesOverviewSelector.recyclers.overview.loading) public loading$: Observable<boolean>;

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    public companies$: Observable<any>;

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
                  this.companies$ = this.authOrg$;
                }
                if (this.route.snapshot['_routerState'].url === '/compliance-organisation/recyclers') {
                  this.companiesOverviewActions.fetchAllRecyclers().toPromise();
                  this.companies$ = this.recyclers$;
                }
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
