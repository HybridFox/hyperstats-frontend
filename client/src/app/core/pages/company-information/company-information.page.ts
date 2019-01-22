import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import countryList from 'country-list';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { AuthActions, AuthSelector } from '@store/auth';
import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
    templateUrl: './company-information.page.html',
})

export class CompanyPageComponent implements OnInit, OnDestroy {
    @select(AuthSelector.register.loading) public loading$: boolean;

    public companyForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public countryList: Option[];

    constructor(
        private authAction: AuthActions,
        private toastrService: ToastrService,
    ) { }

    ngOnInit(): void {
        this.companyForm = new FormGroup({
            name: new FormControl('', Validators.required),
            street: new FormControl('', Validators.required),
            number: new FormControl('', Validators.required),
            box: new FormControl('', Validators.required),
            zip: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            country: new FormControl('', Validators.required)
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
        this.authAction.register({
            ...this.companyForm.value
        }).then(() => {
            // TODO: translate
            this.toastrService.success(
                ngxExtract('TOAST.COMPANY-INFORMATION.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.COMPANY-INFORMATION.SUCCESS.TITLE') as string
            );
            this.companyForm.reset();
        }).catch(() => {
            this.toastrService.success(
                ngxExtract('TOAST.COMPANY-INFORMATION.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.COMPANY-INFORMATION.ERROR.TITLE') as string
            );
        });
    }
}
