import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { pathOr } from 'ramda';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnChanges {
    @Input() public user: any;

    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
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
}
