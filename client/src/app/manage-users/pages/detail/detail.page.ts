import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, select$ } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { UsersActions } from '../../store/users/actions';
import { UserSelector } from '../../store/users/selectors';
import { UserCompanyActions } from '../../store/companies/actions';
import { UserCompanySelector } from '../../store/companies/selectors';
import { companiesToSelectOptions } from '@helpers/select.helpers';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
    @select(UserSelector.detail.result) public user$: Observable<any>;
    @select$(UserCompanySelector.list.result, companiesToSelectOptions) public companyOptions$: Observable<any>;
    @select(UserSelector.detail.loading) public loading$: Observable<boolean>;

    private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        private route: ActivatedRoute,
        private usersActions: UsersActions,
        private userCompanyActions: UserCompanyActions,
        private toastrService: ToastrService,
    ) {}

    public ngOnInit() {
        this.userCompanyActions.fetchUserCompanies().toPromise();
        this.route.params
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe(({ id }) => {
                this.usersActions.fetchById(id).subscribe();
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public update(user: any) {
        this.usersActions.updateUser(user).toPromise()
            .then(() => this.toastrService.success(
                ngxExtract('TOAST.USER-ADMIN-SAVE.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.USER-ADMIN-SAVEF.SUCCESS.TITLE') as string
            ))
            .catch(() => this.toastrService.error(
                ngxExtract('TOAST.USER-ADMIN-SAVE.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.USER-ADMIN-SAVE.ERROR.TITLE') as string
            ));
    }
}
