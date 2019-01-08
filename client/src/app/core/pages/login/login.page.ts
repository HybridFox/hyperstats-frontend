import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthActions } from '@store/auth';

@Component({
    templateUrl: './login.page.html',
})
export class LoginPageComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(
        private authAction: AuthActions
    ) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    public submit() {
        this.authAction.login({
            ...this.loginForm.value
        }).subscribe();
    }
}
