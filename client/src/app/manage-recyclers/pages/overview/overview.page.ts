import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';

@Component({
    templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit, OnDestroy {
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    public ngOnInit() {
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
