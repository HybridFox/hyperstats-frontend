import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthActions, AuthSelector } from '@store/auth';
import { UserInterface } from '@store/auth/auth.interface';

@Component({
    templateUrl: './profile.page.html',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
    @select(AuthSelector.user.result) public user$: Observable<UserInterface>;

    public profileForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        private authAction: AuthActions,
        private toastrService: ToastrService,
    ) { }

    ngOnInit(): void {
        this.profileForm = new FormGroup({
            email: new FormControl('', Validators.required),
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

        this.user$
            .subscribe((user) => this.profileForm.patchValue(user));
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public submit() {
        if (!this.profileForm.valid) {
            return this.toastrService.error('TOAST.GENERAL.INVALID.DESCRIPTION', 'TOAST.GENERAL.INVALID.TITLE');
        }

        return this.authAction.updateProfile({
            ...this.profileForm.value
        }).then(() => {
            // TODO: translate
            this.toastrService.success('TOAST.REGISTER.SUCCESS.DESCRIPTION', 'TOAST.REGISTER.SUCCESS.TITLE');
            this.profileForm.reset();
        }).catch(() => {
            this.toastrService.error('TOAST.REGISTER.ERROR.DESCRIPTION', 'TOAST.REGISTER.ERROR.TITLE');
        });
    }
}
