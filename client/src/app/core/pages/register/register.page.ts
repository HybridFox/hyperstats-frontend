import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthActions } from '@store/auth';

@Component({
    templateUrl: './register.page.html',
})
export class RegisterPageComponent implements OnInit {
    public registerForm: FormGroup;

    constructor(
        private authAction: AuthActions
    ) { }

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            email: new FormControl('', Validators.required),
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    public submit() {
        this.authAction.register({
            ...this.registerForm.value
        }).subscribe();
    }
}
