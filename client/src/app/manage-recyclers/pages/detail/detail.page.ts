import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { RecyclerSelector, RecyclersActions } from '../../store';

@Component({
    templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
    @select(RecyclerSelector.overview.result) public recyclers$: BehaviorSubject<any>;
    @select(RecyclerSelector.detail.loading) public loading$: BehaviorSubject<boolean>;

    private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public recycler: object;

    constructor(
        private route: ActivatedRoute,
        private recyclersActions: RecyclersActions
    ) {}

    public ngOnInit() {
        this.recyclersActions.fetchAllRecyclers().toPromise();
        this.route.params
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe(({ id }) => {
              this.recyclers$.subscribe(recycler => {
                if (recycler && recycler.length > 0) {
                  this.recycler = recycler.find(x => x._id === id );
                }
              });
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
