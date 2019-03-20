import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { CompaniesOverviewSelector, CompaniesOverviewActions } from '../../store';

@Component({
    templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
    @select(CompaniesOverviewSelector.recyclers.overview.result) public companies$: BehaviorSubject<any>;
    @select(CompaniesOverviewSelector.recyclers.detail.loading) public loading$: BehaviorSubject<boolean>;

    private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public company: object;

    constructor(
        private route: ActivatedRoute,
        private companiesActions: CompaniesOverviewActions
    ) {}

    public ngOnInit() {
        this.companiesActions.fetchAllRecyclers().toPromise();
        this.route.params
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe(({ id }) => {
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
