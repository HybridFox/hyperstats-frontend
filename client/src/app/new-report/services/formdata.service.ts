import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FormDataService {
    private formGroup: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.formGroup = this.formBuilder.group({
            information: this.formBuilder.group({
                reportingYear: ['', Validators.required],
                recyclingProcess: ['', Validators.required],
                name: ['', Validators.required],
                receiver: ['', Validators.required]
            }),
            inputFraction: this.formBuilder.group({
                weightInput: '',
                shareOfBatteryType: '',
                weightBatteryType: '',
            })
        });
    }

    getFormData(): FormGroup {
        return this.formGroup;
    }
}
