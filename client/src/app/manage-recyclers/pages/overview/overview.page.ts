import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RecyclersActions, RecyclerSelector } from '../../store';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit, OnDestroy {
    @select(RecyclerSelector.overview.result) public recyclers$: Observable<any>;
    @select(RecyclerSelector.overview.loading) public loading$: Observable<boolean>;
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
      private route: ActivatedRoute,
      private recyclersActions: RecyclersActions,
  ) {}

    public ngOnInit() {
      this.route.queryParams
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe((params) => {
                this.recyclersActions.fetchAllRecyclers().toPromise();
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
