import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import pathOr from 'ramda/es/pathOr';

@Injectable()
export class FormDataService {
  public currentTitle: string;

  private formGroup: any;

  constructor(
    private formBuilder: FormBuilder
  ) {
   this.initForm();
  }

  public addInputElement(): void {
    this.formGroup.controls.inputFraction.controls[0].controls.data.controls.elements.push(this.createInputElement());
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

  public createInputFraction(stepId = 'temp'): FormGroup {
    return this.formBuilder.group({
      siteRef: [stepId],
      data: this.formBuilder.group({
        processChemistry: ['', Validators.required],
        weightInput: [null, Validators.required],
        shareOfBatteryType: [null, Validators.required],
        weightBatteryType: [null, Validators.required],
        elements: this.formBuilder.array([this.createInputElement()]),
        descriptionOfMethodologyShare: ['', Validators.required],
        descriptionOfMethodologyChemicalComposition: ['', Validators.required],
        massOfExternalJacket: [null, Validators.required],
        massOfOuterCasings: [null, Validators.required],
      })
    });
  }

  public createInputElement(): FormGroup {
    return this.formBuilder.group({
      element: ['', Validators.required],
      share: [null],
      mass: [null, Validators.required],
    });
  }

  public createOutputElement(stepId = 'temp'): FormGroup {
    return this.formBuilder.group({
      siteRef: [stepId],
      data: this.formBuilder.array([this.formBuilder.group({
        element: ['', Validators.required],
        mass: [null, Validators.required],
        virginClassification: ['', Validators.required],
        virginReplacedMaterial: ['', Validators.required],
        elementClassification: ['', Validators.required],
        elementReplacedMaterial: ['', Validators.required],
      })])
    });
  }

  public createAdditive(stepId = 'temp'): FormGroup {
    return this.formBuilder.group({
      siteRef: stepId,
      data: this.formBuilder.group({
        type: ['', Validators.required],
        weight: [null, Validators.required],
      })
    });
  }

  public getFormData(): FormGroup {
    return this.formGroup;
  }

  public getRecyclingProcess(): string {
    return this.formGroup.controls.information.controls.recyclingProcess.value;
  }

  public setFormData(report: any): FormGroup {
    if (report) {
      const steps = report.data.inputFraction.map((fraction) => ({
        uuid: fraction.siteRef
      }));

      this.prepareProcessSteps({ data: { steps }});

      this.formGroup.patchValue(report.data);
    } else {
      this.initForm();
    }

    return this.formGroup;
  }

  public prepareProcessSteps(process): void {
    const steps = pathOr([], ['data', 'steps'])(process);

    this.formGroup.setControl(
      'inputFraction',
      this.formBuilder.array(this.getProcessSteps((id) => this.createInputFraction(id), steps))
    );
    this.formGroup.setControl(
      'additives',
      this.formBuilder.array(this.getProcessSteps((id) => this.createAdditive(id), steps))
    );
    this.formGroup.setControl(
      'outputFraction',
      this.formBuilder.array(this.getProcessSteps((id) => this.createOutputElement(id), steps))
    );
  }

  private getProcessSteps (formCreator: Function, steps: any[]) {
    return steps.map((step) => formCreator(step.uuid));
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      information: this.formBuilder.group({
        reportingYear: [null, Validators.required],
        recyclingProcess: [null, Validators.required],
        name: ['', Validators.required],
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
}
