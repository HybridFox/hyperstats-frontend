import { Component, OnInit, } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recycling-partner-page',
  templateUrl: './recycling-partner.page.html',
})
export class RecyclingPartnerPageComponent implements OnInit {
    public recyclingPartnerForm: any;

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    public ngOnInit() {
        this.recyclingPartnerForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }
}
