import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, select$ } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { UserCompanySelector } from '../../store/companies/selectors';
import { companiesToSelectOptions } from '@helpers/select.helpers';
import { ToastrService } from 'ngx-toastr';
import { Option } from '@ui/form-fields/components/select/select.types';
import { UserCompanyActions } from 'src/app/manage-users/store/companies/actions';
import { UserSelector, UsersActions } from 'src/app/manage-users/store';

@Component({
    templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
    @select(UserSelector.detail.result) public user$: Observable<any>;
    @select$(UserCompanySelector.list.result, companiesToSelectOptions) public companyOptions$: Observable<Option>;
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
                ngxExtract('TOAST.USER-ADMIN-SAVE.SUCCESS.TITLE') as string
            ))
            .catch(() => this.toastrService.error(
                ngxExtract('TOAST.USER-ADMIN-SAVE.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.USER-ADMIN-SAVE.ERROR.TITLE') as string
            ));
    }

    public updateRequest(event) {
      if (event.bool) {
        this.usersActions.updateUser(event.user).toPromise()
            .then(() => this.toastrService.success(
                ngxExtract('TOAST.USER-ADMIN-ACCEPT.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.USER-ADMIN-ACCEPT.SUCCESS.TITLE') as string
            ))
            .catch(() => this.toastrService.error(
                ngxExtract('TOAST.USER-ADMIN-ACCEPT.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.USER-ADMIN-ACCEPT.ERROR.TITLE') as string
            ));
      } else {
        event.user.meta.status.type = 'DEACTIVATED';
        this.usersActions.updateUser(event.user).toPromise()
            .then(() => this.toastrService.success(
                ngxExtract('TOAST.USER-ADMIN-DECLINE.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.USER-ADMIN-DECLINE.SUCCESS.TITLE') as string
            ))
            .catch(() => this.toastrService.error(
                ngxExtract('TOAST.USER-ADMIN-DECLINE.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.USER-ADMIN-DECLINE.ERROR.TITLE') as string
            ));
      }
    }
}
