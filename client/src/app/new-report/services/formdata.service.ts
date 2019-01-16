import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FormDataService {
    private formGroup: any;

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
                weightInput: ['', Validators.required],
                shareOfBatteryType: ['', Validators.required],
                weightBatteryType: ['', Validators.required],
                elements: this.formBuilder.array([this.createInputElement()])
            }),
            additives: this.formBuilder.array([this.createAdditive()]),
            outputFraction: this.formBuilder.array([this.createOutputElement()]),
            recyclingEfficiency: this.formBuilder.array([this.createRecyclingElement()]),
            additionalInformation: this.formBuilder.group({
                files: [[]],
                additionalInformation: ['']
            }),
        });
    }

    public addInputElement(): void {
        this.formGroup.controls.inputFraction.controls.elements.push(this.createInputElement());
    }

    public addAdditive(): void {
        this.formGroup.controls.additives.push(this.createAdditive());
    }

    public addOutputElement(): void {
        this.formGroup.controls.outputFraction.push(this.createOutputElement());
    }

    public addRecyclingElement(): void {
        this.formGroup.controls.recyclingEfficiency.push(this.createOutputElement());
    }

    private createInputElement(): FormGroup {
      return this.formBuilder.group({
        element: ['', Validators.required],
        share: ['', Validators.required],
        mass: ['', Validators.required],
      });
    }

    private createOutputElement(): FormGroup {
      return this.formBuilder.group({
        element: ['', Validators.required],
        share: ['', Validators.required],
        mass: ['', Validators.required],
        classification: ['', Validators.required],
        replacedMaterial: ['', Validators.required],
        elementClassification: ['', Validators.required],
        elementReplacedMaterial: ['', Validators.required],
      });
    }

    private createAdditive(): FormGroup {
      return this.formBuilder.group({
        type: ['', Validators.required],
        weight: ['', Validators.required],
      });
    }

    private createRecyclingElement(): FormGroup {
      return this.formBuilder.group({
        element: ['', Validators.required],
        input: ['', Validators.required],
        output: ['', Validators.required],
      });
    }

    public getFormData(): FormGroup {
        return this.formGroup;
    }
}
