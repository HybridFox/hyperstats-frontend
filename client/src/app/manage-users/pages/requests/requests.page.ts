import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserSelector, UsersActions } from '../../store';

@Component({
  templateUrl: './requests.page.html',
})
export class RequestsPageComponent implements OnInit, OnDestroy {
  @select(UserSelector.requests.result) public users$: Observable<any>;
  @select(UserSelector.requests.loading) public loading$: Observable<boolean>;

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  public data: boolean;

  constructor(
      private usersActions: UsersActions,
      private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.users$.subscribe(users => {
      if (users) {
        users.length !== 0 ? this.data = true : this.data = false;
      }
    });
    this.route.queryParams
      .pipe(
          takeUntil(this.componentDestroyed$)
      )
      .subscribe((users) => {
          this.usersActions.fetchPendingRequests().toPromise();
      });
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
