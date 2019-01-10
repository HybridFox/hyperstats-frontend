import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthActions } from '@store/auth';

@Component({
    templateUrl: './forgot-password.page.html',
})
export class ForgotPasswordPageComponent implements OnInit, OnDestroy {
    public loginForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        private authAction: AuthActions,
        private toastrService: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public submit() {
        this.authAction.login({
            ...this.loginForm.value
        }).then(() => {
            this.toastrService.success('An email has been send');
            this.loginForm.reset();
        }).catch(() => {
            this.toastrService.error('Make sure you used the correct combination', 'Something went wrong');
        });
    }
}
