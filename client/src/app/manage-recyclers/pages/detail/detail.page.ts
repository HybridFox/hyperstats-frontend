import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {

    private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        private route: ActivatedRoute,
    ) {}

    public ngOnInit() {
        this.route.params
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe(({ id }) => {
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
