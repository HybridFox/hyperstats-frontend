import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthActions } from '@store/auth';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.page.html',
})
export class LoginPageComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authAction: AuthActions
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public submit() {
        this.authAction.login({
            ...this.loginForm.value
        }).subscribe();
    }
}
