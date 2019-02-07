import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    template: '',
})
export class LandingPageComponent implements OnInit, OnDestroy {
    @select(['auth', 'user', 'result']) private user$: Observable<any>;

    private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        private router: Router,
    ) {}

    public ngOnInit() {
        this.user$
            .pipe(
                takeUntil(this.componentDestroyed$)
            )
            .subscribe((user) => {
                if (user.isAdmin) {
                    this.router.navigate(['admin']);
                } else {
                    this.router.navigate(['reports']);
                }
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
