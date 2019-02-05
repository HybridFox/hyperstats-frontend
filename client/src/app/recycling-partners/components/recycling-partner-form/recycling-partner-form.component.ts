import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
    selector: 'app-recycling-partner-form',
    templateUrl: './recycling-partner-form.html'
})

export class RecyclingPartnerFormComponent implements OnInit, OnDestroy {
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
            company: ['', Validators.required],
            street: ['', Validators.required],
            number: ['', Validators.required],
            box: ['', ''],
            zipcode: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            name: ['', Validators.required],
            function: ['', Validators.required],
            phone: ['', Validators.required],
            mobile: ['', Validators.required],
            email: ['', Validators.required],
        });
    }

}
