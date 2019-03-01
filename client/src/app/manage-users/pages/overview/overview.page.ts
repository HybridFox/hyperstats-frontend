import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import pathOr from 'ramda/es/pathOr';

import { UsersActions } from '../../store/users/actions';
import { UserSelector } from '../../store/users/selectors';
import { UserType } from '../../store/users/types';
import { CompanyType } from '@api/company/company.types';
import { TranslateService } from '@ngx-translate/core';
import { UserCompanyActions } from '../../store/companies/actions';

@Component({
    templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit, OnDestroy {
    @select(UserSelector.overview.result) public users$: Observable<any>;
    @select(UserSelector.overview.loading) public loading$: Observable<boolean>;

    public filter: FormGroup;

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private usersActions: UsersActions,
        private userCompanyActions: UserCompanyActions,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private translateService: TranslateService
    ) {}

    public ngOnInit() {
        this.setFilterForm();

        this.route.queryParams
            .pipe(
                takeUntil(this.componentDestroyed$)
            )
            .subscribe((params) => {
                const types = pathOr(0, ['types', 'length'])(params) > 0 ? params.types : null;
                this.usersActions.fetchByTypes(types, params.admin === 'true').toPromise();
                this.userCompanyActions.fetchUserCompanies().toPromise();
            });

        this.filter.valueChanges
            .pipe(
                takeUntil(this.componentDestroyed$),
                map((data: any) => ({
                    types: data.types.reduce((acc, type) => {
                        return type.selected ? acc.concat([type.value]) : acc;
                    }, []),
                    admin: data.admin.selected
                }))
            )
            .subscribe((value) => {
                this.router.navigate([], {
                    queryParams: {
                        types: value.types,
                        admin: value.admin,
                    }
                });
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    private setFilterForm() {
        const originalParams = this.route.snapshot.queryParams;
        const types = pathOr(false, ['types', 'length'])(originalParams) ?
            originalParams.types :
            [CompanyType.R, CompanyType.RP, CompanyType.CO];

        this.filter = this.createFilterForm([
            {
                value: CompanyType.R,
                label: this.translateService.instant('TYPES.COMPANY.RECYCLER'),
                selected: types.indexOf(CompanyType.R) !== -1
            },
            {
                value: CompanyType.RP,
                label: this.translateService.instant('TYPES.COMPANY.RECYCLER-PARTNER'),
                selected: types.indexOf(CompanyType.RP) !== -1
            },
            {
                value: CompanyType.CO,
                label: this.translateService.instant('TYPES.COMPANY.COMPLIANCE-ORG'),
                selected: types.indexOf(CompanyType.CO) !== -1
            }
        ], originalParams.admin === 'true');

        this.router.navigate([], {
          queryParams: {
              types: types,
              admin: originalParams.admin
          },
      });
    }

    private createFilterForm(types, isAdmin) {
        return this.formBuilder.group({
            admin: this.formBuilder.group({
                value: UserType.ADMIN,
                label: 'Admin',
                selected: isAdmin,
            }),
            types: this.formBuilder.array(types.map((type) => {
                return this.formBuilder.group({
                    value: type.value,
                    label: type.label,
                    selected: type.selected,
                });
            })),
        });
    }
}
