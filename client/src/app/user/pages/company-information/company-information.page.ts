import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import countryList from 'country-list';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { AuthSelector, AuthActions } from '@store/auth';
import { Option } from '@ui/form-fields/components/select/select.types';
import { CompanyRepository } from '@api/company';
import { FormHelper } from '@helpers/form.helper';

@Component({
    templateUrl: './company-information.page.html',
})

export class CompanyPageComponent implements OnInit, OnDestroy {
    @select(AuthSelector.register.loading) public loading$: boolean;
    @select(AuthSelector.user.result) public user$: Observable<any>;

    public companyForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public countryList: Option[];

    constructor(
        private formBuilder: FormBuilder,
        private companyRepository: CompanyRepository,
        private toastrService: ToastrService,
        private authActions: AuthActions
    ) { }

    ngOnInit(): void {
        this.companyForm = this.formBuilder.group({
            name: ['', Validators.required],
            vat: ['', ''],
            address: this.formBuilder.group({
                street: ['', Validators.required],
                number: ['', Validators.required],
                box: [''],
                zipCode: ['', Validators.required],
                city: ['', Validators.required],
                country: ['', Validators.required]
            }),
            contactPerson: this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', Validators.required],
            }),
        });

        this.user$.subscribe((user) => {
            if (user && user.company && user.company.data) {
                this.companyForm.patchValue(user.company.data);
            }
        });

        this.countryList = countryList.getData().map(({code, name}) => ({
            value: code,
            label: name,
        }));
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public submit() {
        FormHelper.markAsDirty(this.companyForm);

        if (!this.companyForm.valid) {
            return this.toastrService.error(
                ngxExtract('TOAST.GENERAL.INVALID.DESCRIPTION') as string,
                ngxExtract('TOAST.GENERAL.INVALID.TITLE') as string
            );
        }

        this.companyRepository.update({
            ...this.companyForm.value
        }).then((company) => {
            this.toastrService.success(
                ngxExtract('TOAST.COMPANY-INFORMATION.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.COMPANY-INFORMATION.SUCCESS.TITLE') as string
            );
            this.authActions.updateCompanyOfProfile(company);
            this.companyForm.setValue(company.data);
        }).catch(() => {
            this.toastrService.error(
                ngxExtract('TOAST.COMPANY-INFORMATION.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.COMPANY-INFORMATION.ERROR.TITLE') as string
            );
        });
    }
}
