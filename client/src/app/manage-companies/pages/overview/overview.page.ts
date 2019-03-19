import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import pathOr from 'ramda/es/pathOr';

import { CompaniesActions } from '../../store/companies/actions';
import { CompanySelector } from '../../store/companies/selectors';
import { CompanyType } from '@api/company';
import { TranslateService } from '@ngx-translate/core';

@Component({
    templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit, OnDestroy {
    @select(['auth', 'user', 'result']) private user$: Observable<any>;
    @select(CompanySelector.overview.result) public companies$: Observable<any>;
    @select(CompanySelector.overview.loading) public loading$: Observable<boolean>;

    public filter: FormGroup;
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private companiesActions: CompaniesActions,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private translateService: TranslateService
    ) {}

    public ngOnInit() {
        this.setFilterForm();

        this.route.queryParams
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe((params) => {
                const types = pathOr(0, ['types', 'length'], params) > 0 ? params.types : null;
                this.companiesActions.fetchByType(types).toPromise();
            });

        this.filter.valueChanges
            .pipe(
                takeUntil(this.componentDestroyed$),
                map((data: any) => data.types.reduce((acc, type) => {
                    return type.selected ? acc.concat([type.value]) : acc;
                }, []))
            )
            .subscribe((value) => {
                this.router.navigate([], {
                    queryParams: {
                        types: value,
                    },
                });
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    private setFilterForm (): void {
        const originalParams = this.route.snapshot.queryParams;
        const types = pathOr(0, ['types', 'length'], originalParams) ?
            originalParams.types :
            [CompanyType.R, CompanyType.CO, CompanyType.AO];

        this.filter = this.createFilterForm([
            {
                value: CompanyType.R,
                label: this.translateService.instant('TYPES.COMPANY.RECYCLER'),
                selected: types.indexOf(CompanyType.R) !== -1
            },
            {
                value: CompanyType.CO,
                label: this.translateService.instant('TYPES.COMPANY.COMPLIANCE-ORG'),
                selected: types.indexOf(CompanyType.CO) !== -1
            },
            {
                value: CompanyType.AO,
                label: this.translateService.instant('TYPES.COMPANY.AUTHORISATION-ORG'),
                selected: types.indexOf(CompanyType.AO) !== -1
            }
        ]);

        this.router.navigate([], {
            queryParams: {
                types: types,
            },
        });
    }

    private createFilterForm (types): FormGroup {
        return this.formBuilder.group({
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
