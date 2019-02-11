import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { CompaniesActions } from '../../store/companies/actions';
import { CompanySelector } from '../../store/companies/selectors';
import { CompanyType } from '../../store/companies/types';


@Component({
    templateUrl: './overview.page.html',
})
export class OverviewPageComponent implements OnInit, OnDestroy {
    @select(CompanySelector.overview.result) public companies$: Observable<any>;
    @select(CompanySelector.overview.loading) public loading$: Observable<boolean>;

    public filter: FormGroup;
    private componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        public companiesActions: CompaniesActions,
        public formBuilder: FormBuilder,
        public router: Router,
        public route: ActivatedRoute,
    ) {}

    public ngOnInit() {
        this.setFilterForm();

        this.route.queryParams
            .pipe(
                takeUntil(this.componentDestroyed$),
            )
            .subscribe((params) => {
                // Todo: Use multiple params!
                const type = params && params.types && params.types.length > 0 ? params.types : null;
                this.companiesActions.fetchByType(type).subscribe();
            });

        this.filter.valueChanges
            .pipe(
                takeUntil(this.componentDestroyed$),
                map((data) => {
                    return data.types
                        .filter((type) => {
                            return type.selected;
                        })
                        .map((type) => {
                            return type.value;
                        });
                })
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
        const types = originalParams.types || [CompanyType.R, CompanyType.RP, CompanyType.CO];

        this.filter = this.createFilterForm([
            { value: CompanyType.R, label: 'Recycler', selected: types.indexOf(CompanyType.R) !== -1 },
            { value: CompanyType.RP, label: 'Recycling Partner', selected: types.indexOf(CompanyType.RP) !== -1 },
            { value: CompanyType.CO, label: 'Compliance organisation', selected: types.indexOf(CompanyType.CO) !== -1 }
        ]);
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
