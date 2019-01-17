import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
            this.toastrService.error('TOAST.FORGOT-PASSWORD.SUCCESS.DESCRIPTION', 'TOAST.FORGOT-PASSWORD.SUCCESS.TITLE');
            this.resetPasswordForm.reset();
        }).catch(() => {
            this.toastrService.error('TOAST.FORGOT-PASSWORD.ERROR.DESCRIPTION', 'TOAST.FORGOT-PASSWORD.ERROR.TITLE');
        });
    }
}
