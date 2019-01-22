import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { AuthActions } from '@store/auth';

@Component({
    templateUrl: './forgot-password.page.html',
})
export class ForgotPasswordPageComponent implements OnInit, OnDestroy {
    public resetPasswordForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        private authAction: AuthActions,
        private toastrService: ToastrService,
    ) { }

    ngOnInit(): void {
        this.resetPasswordForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public submit() {
        this.authAction.requestPasswordReset({
            ...this.resetPasswordForm.value
        }).then(() => {
            this.toastrService.success(
                ngxExtract('TOAST.RESET-PASSWORD.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.RESET-PASSWORD.SUCCESS.TITLE') as string
            );
            this.resetPasswordForm.reset();
        }).catch(() => {
            this.toastrService.error(
                ngxExtract('TOAST.RESET-PASSWORD.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.RESET-PASSWORD.ERROR.TITLE') as string
            );
            this.resetPasswordForm.reset();
        });
    }
}
