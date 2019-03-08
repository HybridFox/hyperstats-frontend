import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { ToastrService } from 'ngx-toastr';

import { AuthActions } from '@store/auth';

@Component({
    templateUrl: './login.page.html',
})
export class LoginPageComponent implements OnInit, OnDestroy {
    @select(['auth', 'user', 'result']) private user$: Observable<any>;

    public loginForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        private authAction: AuthActions,
        private toastrService: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.user$.subscribe((user) => {
            if (user) {
                this.router.navigate(['/']);
            }
        });

        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
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
            this.toastrService.success(ngxExtract('TOAST.LOGIN.SUCCESS.TITLE') as string);
            this.router.navigate(['/']);
        }).catch(() => {
            this.toastrService.error(
                ngxExtract('TOAST.LOGIN.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.LOGIN.ERROR.TITLE') as string
            );
        });
    }
}
