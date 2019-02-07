import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { pathOr } from 'ramda';

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnChanges {
    @Input() public company: any;

    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.company && this.company) {
            this.form = this.createForm(this.company);

            // Temp disable this form until the edit page is implemented
            this.form.disable();
        }
    }

    private createForm(company: any): FormGroup {
        return this.formBuilder.group({
            data: this.formBuilder.group({
                name: this.formBuilder.control(pathOr('', ['data', 'name'], company)),
                address: this.formBuilder.group({
                    street: this.formBuilder.control(pathOr('', ['data', 'address', 'street'], company)),
                    number: this.formBuilder.control(pathOr('', ['data', 'address', 'number'], company)),
                    zipCode: this.formBuilder.control(pathOr('', ['data', 'address', 'zipCode'], company)),
                    city: this.formBuilder.control(pathOr('', ['data', 'address', 'city'], company)),
                    country: this.formBuilder.control(pathOr('', ['data', 'address', 'country'], company)),
                })
            }),
        });
    }
}
