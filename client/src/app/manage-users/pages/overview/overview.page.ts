import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';

import { UsersActions } from '../../store/users/actions';
import { UserSelector } from '../../store/users/selectors';

@Component({
    templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit {
    @select(UserSelector.result) public users$;
    @select(UserSelector.loading) public loading$;

    constructor(
        public usersActions: UsersActions,
    ) {}

    public ngOnInit() {
        this.usersActions.fetchAll().subscribe();
    }
}
