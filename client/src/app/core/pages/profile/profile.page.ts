import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

import { AuthActions, AuthSelector } from '@store/auth';
import { UserInterface } from '@store/auth/auth.interface';
import { FormHelper } from '@helpers/form.helper';

@Component({
    templateUrl: './profile.page.html',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
    @select(AuthSelector.user.result) public user$: Observable<UserInterface>;

    public profileForm: FormGroup;
    public user: UserInterface;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        private authAction: AuthActions,
        private toastrService: ToastrService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.profileForm = this.formBuilder.group({
            email: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['']
        });

        this.user$
            .subscribe((user) => {
                this.profileForm.patchValue(user);
                this.user = user;
            });
    }

    public resetPassword(): Promise<any> {
        return this.authAction.requestPasswordReset({
            email: this.user.email
        }).then(() => {
            this.toastrService.success(
                ngxExtract('TOAST.FORGOT-PASSWORD.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.FORGOT-PASSWORD.SUCCESS.TITLE') as string
            );
        }).catch(() => {
            return this.toastrService.error(
                ngxExtract('TOAST.FORGOT-PASSWORD.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.FORGOT-PASSWORD.ERROR.TITLE') as string
            );
        });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public submit() {
        FormHelper.markAsDirty(this.profileForm);
        if (!this.profileForm.valid) {
            return this.toastrService.error(
                ngxExtract('TOAST.GENERAL.INVALID.DESCRIPTION') as string,
                ngxExtract('TOAST.GENERAL.INVALID.TITLE') as string
            );
        }

        return this.authAction.updateProfile({
            ...this.profileForm.value
        }).then(() => {
            this.toastrService.success(
                ngxExtract('TOAST.PROFILE.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.PROFILE.SUCCESS.TITLE') as string
            );
        }).catch(() => {
            return this.toastrService.error(
                ngxExtract('TOAST.PROFILE.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.PROFILE.ERROR.TITLE') as string
            );
        });
    }
}
