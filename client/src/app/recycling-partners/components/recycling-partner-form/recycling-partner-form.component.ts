import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import countryList from 'country-list';
import { prop, pathOr } from 'ramda';

import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
    selector: 'app-recycling-partner-form',
    templateUrl: './recycling-partner-form.html'
})

export class RecyclingPartnerFormComponent implements OnChanges, OnInit {
    @Input() public recyclingPartner: any;

    @Output() public submit: EventEmitter<any> = new EventEmitter<any>();
    @Output() public remove: EventEmitter<string> = new EventEmitter<string>();
    @Output() public toggleActivation: EventEmitter<any> = new EventEmitter<any>();

    public countryList: Option[];
    public recyclingPartnerForm: FormGroup;
    public isActivated: boolean;

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit() {
        this.countryList = countryList.getData().map(({ code, name }) => ({
            value: code,
            label: name,
        }));
    }

    public ngOnChanges() {
        this.buildForm(prop('data')(this.recyclingPartner));
    }

    public saveForm() {
      console.log(this.recyclingPartnerForm);
        if (this.recyclingPartnerForm.invalid) {
            return;
        }

        this.submit.emit({
            ...this.recyclingPartner || {},
            data: this.recyclingPartnerForm.getRawValue(),
            meta: {
                type: 'RP'
            }
        });
    }

    public removeForm() {
        if (!prop('_id')(this.recyclingPartner)) {
            return;
        }

        this.remove.emit(this.recyclingPartner._id);
    }

    public toggleActivationForm() {
        this.toggleActivation.emit(this.recyclingPartner._id);
    }

    private buildForm(value = {
        name: '',
        vat: '',
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
            vat: [value.vat, Validators.required],
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
                email: [value.contactPerson.email, [Validators.required, Validators.email]],
            })
        });
    }

}
