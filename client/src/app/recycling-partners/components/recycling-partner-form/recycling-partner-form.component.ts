import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { prop, pathOr } from 'ramda';

import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
    selector: 'app-recycling-partner-form',
    templateUrl: './recycling-partner-form.html'
})

export class RecyclingPartnerFormComponent implements OnChanges {
    @Input() public countryList: Option[];
    @Input() public recyclingPartner: any;

    @Output() public submit: EventEmitter<any> = new EventEmitter<any>();
    @Output() public remove: EventEmitter<string> = new EventEmitter<string>();
    @Output() public toggleActivation: EventEmitter<any> = new EventEmitter<any>();

    public recyclingPartnerForm: FormGroup;
    public isActivated: boolean;

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    public ngOnChanges() {
        this.buildForm(prop('data')(this.recyclingPartner));
        this.isActivated = pathOr(false, ['meta', 'activated'])( this.recyclingPartner);
    }

    public saveForm() {
        if (this.recyclingPartnerForm.invalid) {
            return;
        }

        this.submit.emit(this.recyclingPartnerForm.getRawValue());
    }

    public removeForm() {
        if (!prop('_id')(this.recyclingPartner)) {
            return;
        }

        this.remove.emit(this.recyclingPartner._id);
    }

    public toggleActivationForm() {
        if (this.isActivated === true) {
            this.isActivated = false;
        } else {
            this.isActivated = true;
        }

        this.toggleActivation.emit({id: this.recyclingPartner._id, isActivated: this.isActivated});
    }

    private buildForm(value = {
        name: '',
        address: {
            street: '',
            number: '',
            box: '',
            zipCode: '',
            city: '',
            country: ''
        },
        contactPerson: {
            name: '',
            function: '',
            phone: '',
            mobile: '',
            email: ''
        }
    }) {
        this.recyclingPartnerForm = this.formBuilder.group({
            name: [value.name, Validators.required],
            address: this.formBuilder.group({
                street: [value.address.street, Validators.required],
                number: [value.address.number, Validators.required],
                box: [value.address.box],
                zipCode: [value.address.zipCode, Validators.required],
                city: [value.address.city, Validators.required],
                country: [value.address.country, Validators.required],
            }),
            contactPerson: this.formBuilder.group({
                name: [value.contactPerson.name, Validators.required],
                function: [value.contactPerson.function, Validators.required],
                phone: [value.contactPerson.phone, Validators.required],
                mobile: [value.contactPerson.mobile, Validators.required],
                email: [value.contactPerson.email, Validators.required],
            })
        });
    }

}
