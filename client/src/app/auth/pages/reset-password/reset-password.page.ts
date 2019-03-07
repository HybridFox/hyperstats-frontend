import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { AuthActions } from '@store/auth';
import { PasswordValidator } from '@helpers/validators/password.validator';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './reset-password.page.html',
})
export class ResetPasswordPageComponent implements OnInit, OnDestroy {
    public resetPasswordForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public token: string;
    public isReset = false;

    constructor(
        private authAction: AuthActions,
        private toastrService: ToastrService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {
        this.route.queryParams
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe(params => {
                this.token = params.token;
            });
    }

    ngOnInit(): void {
        this.resetPasswordForm = this.formBuilder.group({
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, PasswordValidator.strong]],
                confirm_password: ['', [Validators.required]],
            }, {validator: this.passwordConfirming}),
            token: [this.token],
        });
    }

    passwordConfirming(c: AbstractControl): { invalid: boolean } {
        if (c.get('password').value !== c.get('confirm_password').value) {
            c.get('confirm_password').setErrors({'PASSWORD-MATCH': true});
            return {invalid: true};
        }
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public submit() {
        this.authAction.resetPassword({
            password: this.resetPasswordForm.value.passwords.password,
            token: this.token
        }).then(() => {
            this.toastrService.success(
                ngxExtract('TOAST.RESET-PASSWORD.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.RESET-PASSWORD.SUCCESS.TITLE') as string
            );
            this.isReset = true;
            this.resetPasswordForm.reset();
        }).catch(() => {
            this.toastrService.error(
                ngxExtract('TOAST.RESET-PASSWORD.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.RESET-PASSWORD.ERROR.TITLE') as string
            );
        });
    }
}
