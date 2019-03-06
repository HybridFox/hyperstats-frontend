import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { AuthActions, AuthSelector } from '@store/auth';
import { PasswordValidator } from '@helpers/validators/password.validator';

@Component({
    templateUrl: './register.page.html',
})
export class RegisterPageComponent implements OnInit, OnDestroy {
    @select(AuthSelector.register.loading) public loading$: boolean;

    public registerForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public registerSucceeded = false;
    public loadingRegister = false;

    constructor(
        private authAction: AuthActions,
        private toastrService: ToastrService
    ) { }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            password: new FormControl('', [PasswordValidator.strong, Validators.required]),
            terms: new FormControl('', Validators.requiredTrue)
        });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public submit() {
        if (!this.registerForm.valid) {
            return this.toastrService.error(
                ngxExtract('TOAST.GENERAL.INVALID.DESCRIPTION') as string,
                ngxExtract('TOAST.GENERAL.INVALID.TITLE') as string
            );
        }

        this.loadingRegister = true;

        return this.authAction.register({
            ...this.registerForm.value
        }).then(() => {
            this.registerSucceeded = true;
        }).catch((error) => {
            this.loadingRegister = false;
            if (error.status === 409) {
              this.toastrService.error(
                ngxExtract('TOAST.REGISTER.EMAIL-ALREADY-TAKEN.DESCRIPTION') as string,
                ngxExtract('TOAST.REGISTER.EMAIL-ALREADY-TAKEN.TITLE') as string
              );
            } else {
              this.toastrService.error(
                ngxExtract('TOAST.REGISTER.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.REGISTER.ERROR.TITLE') as string
              );
            }
        });
    }
}
