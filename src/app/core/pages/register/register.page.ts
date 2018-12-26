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
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public submit() {
        console.log('onSubmit');
        this.authAction.register({
            ...this.registerForm.value
        });
    }
}
