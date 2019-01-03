import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthActions } from '@store/auth';

@Component({
    selector: 'app-register-page',
    templateUrl: './register.page.html',
})
export class RegisterPageComponent implements OnInit {
    public registerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authAction: AuthActions
    ) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.required]
        });
    }

    public submit() {
        this.authAction.register({
            ...this.registerForm.value
        })
            .subscribe();
    }
}
