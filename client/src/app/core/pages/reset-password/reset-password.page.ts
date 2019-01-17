import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
            password: ['', [Validators.required, PasswordValidator.strong]],
            token: [this.token],
        });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public submit() {
        this.authAction.resetPassword({
            password: this.resetPasswordForm.value.password,
            token: this.token
        }).then(() => {
            this.toastrService.error('TOAST.SUCCESS.ERROR.DESCRIPTION', 'TOAST.SUCCESS.ERROR.TITLE');
            this.resetPasswordForm.reset();
        }).catch(() => {
            this.toastrService.error('TOAST.RESET-PASSWORD.ERROR.DESCRIPTION', 'TOAST.RESET-PASSWORD.ERROR.TITLE');
        });
    }
}
