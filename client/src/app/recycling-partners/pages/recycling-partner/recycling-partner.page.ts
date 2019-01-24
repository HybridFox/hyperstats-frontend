import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import countryList from 'country-list';
import { Option } from '@ui/form-fields/components/select/select.types';

@Component({
  selector: 'app-recycling-partner-page',
  templateUrl: './recycling-partner.page.html',
})
export class RecyclingPartnerPageComponent implements OnInit {
    public recyclingPartnerForm: any;
    public countryList: Option[];

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    public ngOnInit() {
        this.recyclingPartnerForm = this.formBuilder.group({
            name: ['', Validators.required],
            country: ['', Validators.required],
        });

        this.countryList = countryList.getData().map(({code, name}) => ({
            value: code,
            label: name,
        }));
    }
}
