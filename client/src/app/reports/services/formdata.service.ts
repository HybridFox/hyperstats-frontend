import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FormDataService {
    private formGroup: any;
    public currentTitle: string;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.formGroup = this.formBuilder.group({
            information: this.formBuilder.group({
                reportingYear: [null, Validators.required],
                recyclingProcess: [null, Validators.required],
                name: ['', Validators.required],
                // receiver: [null, Validators.required]
            }),
            inputFraction: this.formBuilder.array([this.createInputFraction()]),
            additives: this.formBuilder.array([this.createAdditive()]),
            outputFraction: this.formBuilder.array([this.createOutputElement()]),
            recyclingEfficiency: this.formBuilder.group({
              calculatedEfficiency: [null, Validators.required]
            }),
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

    private createInputFraction(): FormGroup {
      return this.formBuilder.group({
            weightInput: ['', Validators.required],
            shareOfBatteryType: ['', Validators.required],
            weightBatteryType: ['', Validators.required],
            elements: this.formBuilder.array([this.createInputElement()]),
            descriptionOfMethodologyShare: ['', Validators.required],
            descriptionOfMethodologyChemicalComposition: ['', Validators.required],
            massOfExternalJacket: ['', Validators.required],
            massOfOuterCasings: ['', Validators.required],
        });
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
        mass: [null, Validators.required],
        classification: ['', Validators.required],
        replacedMaterial: ['', Validators.required],
        elementClassification: ['', Validators.required],
        elementReplacedMaterial: ['', Validators.required],
      });
    }

    private createAdditive(): FormGroup {
      return this.formBuilder.group({
        type: ['', Validators.required],
        weight: [null, Validators.required],
      });
    }

    public getFormData(): FormGroup {
        return this.formGroup;
    }

    public getRecyclingProcess(): string {
        return this.formGroup.controls.information.controls.recyclingProcess.value;
    }

    public setFormData(report: any): FormGroup {
        this.formGroup.patchValue(report.data);

        return this.formGroup;
    }
}
