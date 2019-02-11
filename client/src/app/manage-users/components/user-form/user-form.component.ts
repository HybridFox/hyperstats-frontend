import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { pathOr } from 'ramda';
import { ToastrService } from 'ngx-toastr';
import { AuthActions, AuthSelector } from '@store/auth';
import { select } from '@angular-redux/store';
import { UserInterface } from '@store/auth/auth.interface';
import { Observable } from 'rxjs';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnChanges {
    @select(AuthSelector.user.result) public user$: Observable<UserInterface>;
    @Input() public user: any;

    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authAction: AuthActions,
        private toastrService: ToastrService
    ) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.user && this.user) {
            this.form = this.createForm(this.user);

            // Temp disable this form until the edit page is implemented
            this.form.disable();
        }
    }

    private createForm(user: any): FormGroup {
        return this.formBuilder.group({
            data: this.formBuilder.group({
                firstname: this.formBuilder.control(pathOr('', ['data', 'firstname'], user)),
                lastname: this.formBuilder.control(pathOr('', ['data', 'lastname'], user)),
                email: this.formBuilder.control(pathOr('', ['data', 'email'], user)),
            }),
        });
    }

    public resetPassword(): Promise<any> {
        return this.authAction.requestPasswordReset({
            email: this.user.data.email
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
}
