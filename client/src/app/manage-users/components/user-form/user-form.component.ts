import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { pathOr } from 'ramda';
import { ToastrService } from 'ngx-toastr';
import { AuthActions } from '@store/auth';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnChanges {
    @Input() public user: any;
    @Input() public companyOptions: Option[];

    @Output() public save: EventEmitter<any> = new EventEmitter<any>();
    @Output() public toggleActivation: EventEmitter<boolean> = new EventEmitter<boolean>();

    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authAction: AuthActions,
        private toastrService: ToastrService
    ) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.user && this.user) {
            this.form = this.createForm(this.user);
        }
    }

    private createForm(user: any): FormGroup {
        return this.formBuilder.group({
            data: this.formBuilder.group({
                firstname: this.formBuilder.control(pathOr('', ['data', 'firstname'], user)),
                lastname: this.formBuilder.control(pathOr('', ['data', 'lastname'], user)),
                email: this.formBuilder.control(pathOr('', ['data', 'email'], user)),
                company: this.formBuilder.control(pathOr('', ['data', 'company', '_id'], user))
            }),
            meta: this.formBuilder.group({
                activated: this.formBuilder.control(pathOr('DEACTIVATED', ['meta', 'status', 'type'], user) === 'ACTIVATED')
            })
        });
    }

    public resetPassword(): Promise<any> {
        return this.authAction.requestPasswordReset({
            email: this.user.data.email
        }).then(() => {
            this.toastrService.success(
                ngxExtract('TOAST.ADMIN-FORGOT-PASSWORD.SUCCESS.DESCRIPTION') as string,
                ngxExtract('TOAST.ADMIN-FORGOT-PASSWORD.SUCCESS.TITLE') as string
            );
        }).catch(() => {
            return this.toastrService.error(
                ngxExtract('TOAST.FORGOT-PASSWORD.ERROR.DESCRIPTION') as string,
                ngxExtract('TOAST.FORGOT-PASSWORD.ERROR.TITLE') as string
            );
        });
    }

    public saveUser(): void {
        this.save.emit(this.formatUser(this.user, this.form.getRawValue()));
    }

    private formatUser(user: any, formValues: any) {
        return {
            ...user,
            data: formValues.data,
            meta: {
                ...user.meta,
                ...formValues.meta,
                status: {
                    type: formValues.meta.activated ? 'ACTIVATED' : 'DEACTIVATED'
                }
            }
        } ;
    }

}
