import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { pathOr } from 'ramda';
import { ToastrService } from 'ngx-toastr';
import { AuthActions } from '@store/auth';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { Option } from '@ui/form-fields/components/select/select.types';
import { STATUS_TYPES } from 'src/lib/constants';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnChanges {
    @Input() public user: any;
    @Input() public companyOptions: Option[];

    @Output() public save: EventEmitter<any> = new EventEmitter<any>();
    @Output() public toggleActivation: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public updateRequest: EventEmitter<object> = new EventEmitter<object>();

    public form: FormGroup;
    public statusTypes = STATUS_TYPES;

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
                company: this.formBuilder.control(pathOr(user.data.company, ['data', 'company', '_id'], user), Validators.required)
            }),
            meta: this.formBuilder.group({
                activated: this.formBuilder.control(
                  pathOr(this.statusTypes.DEACTIVATED,
                  ['meta', 'status', 'type'], user) === this.statusTypes.PENDING
                )
            })
        });
    }

    public resetPassword(): Promise<any> {
        return this.authAction.requestPasswordReset({
            username: this.user.data.username
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
                    type: formValues.meta.activated ? this.statusTypes.ACTIVATED : this.statusTypes.DEACTIVATED
                }
            }
        };
    }

    public handleRequest(bool) {
        const user = this.formatUser(this.user, this.form.getRawValue());
        this.updateRequest.emit({ bool, user });
    }

}
