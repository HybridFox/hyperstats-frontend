import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { select } from '@angular-redux/store';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { AuthActions, AuthSelector } from '@store/auth';

@Component({
    templateUrl: './contact.page.html',
})
export class ContactPageComponent implements OnInit, OnDestroy {
    @select(AuthSelector.register.loading) public loading$: boolean;

    public contactForm: FormGroup;
    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

    constructor(
        private authAction: AuthActions,
        private toastrService: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.contactForm = new FormGroup({
            email: new FormControl('', Validators.required),
            firstname: new FormControl('', Validators.required),
            lastname: new FormControl('', Validators.required),
            message: new FormControl('', Validators.required),
        });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public submit() {
        this.authAction.register({
            ...this.contactForm.value
        }).then(() => {
            // TODO: translate
            this.toastrService.success('TOAST.REGISTER.SUCCESS.DESCRIPTION', 'TOAST.REGISTER.SUCCESS.TITLE');
            this.contactForm.reset();
        }).catch(() => {
            this.toastrService.success('TOAST.REGISTER.ERROR.DESCRIPTION', 'TOAST.REGISTER.ERROR.TITLE');
        });
    }
}
