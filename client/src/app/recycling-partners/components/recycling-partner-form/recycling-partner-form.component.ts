import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
    selector: 'app-recycling-partner-form',
    templateUrl: './recycling-partner-form.html'
})

export class RecyclingPartnerFormComponent implements OnInit {
    @Input() public countryList: Option[];
    @Input() public recyclingPartner: any;
    public recyclingPartnerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    public ngOnInit() {
        this.buildForm(this.recyclingPartner);
    }

    private buildForm(value) {
        this.recyclingPartnerForm = this.formBuilder.group({
            company: [
                value.data.name,
                Validators.required
            ],
            street: [
                value.data.address.street,
                Validators.required
            ],
            number: [
                value.data.address.number,
                Validators.required
            ],
            box: [
                value.data.address.box,
                ''
            ],
            zipcode: [
                value.data.address.zipCode,
                Validators.required
            ],
            city: [
                value.data.address.city,
                Validators.required
            ],
            country: [
                value.data.address.country,
                Validators.required
            ],
            name: [
                value.data.contactPerson.name,
                Validators.required
            ],
            function: [
                value.data.contactPerson.function,
                Validators.required
            ],
            phone: [
                value.data.contactPerson.phone,
                Validators.required
            ],
            mobile: [
                value.data.contactPerson.mobile,
                Validators.required
            ],
            email: [
                value.data.contactPerson.email,
                Validators.required
            ],
        });
    }

}
