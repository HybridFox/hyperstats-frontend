import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthActions, AuthSelector } from '@store/auth';

@Component({
    templateUrl: './company-information.page.html',
})

export class CompanyPageComponent implements OnInit, OnDestroy {
    @select(AuthSelector.register.loading) public loading$: boolean;

    public companyForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

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
            this.toastrService.success('TOAST.REGISTER.SUCCESS.DESCRIPTION', 'TOAST.REGISTER.SUCCESS.TITLE');
            this.companyForm.reset();
        }).catch(() => {
            this.toastrService.success('TOAST.REGISTER.ERROR.DESCRIPTION', 'TOAST.REGISTER.ERROR.TITLE');
        });
    }
}
