import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { CompaniesOverviewSelector, CompaniesOverviewActions } from '../../store';

@Component({
    templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
    @select(CompaniesOverviewSelector.recyclers.overview.result) public recyclers$: Observable<any>;
    @select(CompaniesOverviewSelector.organisations.overview.result) public organisations$: Observable<any>;
    @select(CompaniesOverviewSelector.recyclers.detail.loading) public loading$: BehaviorSubject<boolean>;

    private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public company: object;
    public companies$: Observable<any>;

    constructor(
        private route: ActivatedRoute,
        private companiesOverviewActions: CompaniesOverviewActions
    ) {}

    public ngOnInit() {
        this.route.params
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe(({ id }) => {
              if (this.route.snapshot['_routerState'].url.includes('/authorisation-org')) {
                this.companiesOverviewActions.fetchAllAuthorisationOrg().toPromise();
                this.companies$ = this.organisations$;
              }
              if (this.route.snapshot['_routerState'].url.includes('/recyclers')) {
                this.companiesOverviewActions.fetchAllRecyclers().toPromise();
                this.companies$ = this.recyclers$;
              }
              if (this.route.snapshot['_routerState'].url.includes('/compliance-org')) {
                this.companiesOverviewActions.fetchAllComplianceOrg().toPromise();
                this.companies$ = this.organisations$;
              }
              this.companies$.subscribe(recycler => {
                if (recycler && recycler.length > 0) {
                  this.company = recycler.find(x => x._id === id );
                }
              });
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
