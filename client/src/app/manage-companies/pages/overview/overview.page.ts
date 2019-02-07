import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

// import { UsersActions } from '../../store/users/actions';
// import { UserSelector } from '../../store/users/selectors';

@Component({
    templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit {
    // @select(UserSelector.overview.result) public users$: Observable<any>;
    // @select(UserSelector.overview.loading) public loading$: Observable<boolean>;

    constructor(
        // public usersActions: UsersActions,
    ) {}

    public ngOnInit() {
        // this.usersActions.fetchAll().subscribe();
    }
}
