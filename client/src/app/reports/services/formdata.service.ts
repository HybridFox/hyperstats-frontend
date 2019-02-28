import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import pathOr from 'ramda/es/pathOr';

@Injectable()
export class FormDataService {
  public currentTitle: string;
  public formGroup: FormGroup;
  public reportId: string;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  public getFormData(): FormGroup {
    return this.formGroup;
  }

  // public getRecyclingProcess(): string {
  //   return this.formGroup.controls.information.controls.recyclingProcess.value;
  // }

  // Todo: Add type
  public initForm(report: any) {
    this.reportId = pathOr('new', ['_id'])(report);
    this.formGroup = this.formBuilder.group({
      information: this.getInformationFormGroup(pathOr(null, ['data', 'information'])(report)),
      inputFraction: this.getInputFractionsFormArray(pathOr([], ['data', 'inputFraction'])(report)),
      additives: this.getAdditivesFormArray(pathOr([], ['data', 'additives'])(report)),
      outputFraction: this.getOutputFractionsFormArray(pathOr([], ['data', 'outputFraction'])(report)),
      recyclingEfficiency: this.getRecyclingEfficiencyFormGroup(pathOr(null, ['data', 'recyclingEfficiency'])(report)),
      additionalInformation: this.getAdditionalInformationFormGroup(pathOr(null, ['data', 'additionalInformation'])(report)),
    });
    return this.formGroup;
  }

  // Todo: Add type
  public getInformationFormGroup(information: any): FormGroup {
    return this.formBuilder.group({
      reportingYear: [pathOr(null, ['reportingYear'])(information), Validators.required],
      recyclingProcess: [pathOr(null, ['recyclingProcess'])(information), Validators.required],
      name: [pathOr('', ['name'])(information), Validators.required],
    });
  }

  // Todo: Add type
  public getInputFractionFormGroup(inputFraction: any): FormGroup {
    return this.formBuilder.group({
      siteRef: [pathOr(null, ['siteRef'])(inputFraction)],
      data: this.formBuilder.group({
        processChemistry: [pathOr(null, ['data', 'processChemistry'])(inputFraction), Validators.required],
        weightInput: [pathOr(null, ['data', 'weightInput'])(inputFraction), Validators.required],
        shareOfBatteryType: [pathOr(null, ['data', 'shareOfBatteryType'])(inputFraction), Validators.required],
        weightBatteryType: [pathOr(null, ['data', 'weightBatteryType'])(inputFraction), Validators.required],
        elements: this.getInputFractionElementsFormArray(pathOr([{}], ['data', 'elements'])(inputFraction)),
        descriptionOfMethodologyShare: [pathOr('', ['data', 'descriptionOfMethodologyShare'])(inputFraction), Validators.required],
        descriptionOfMethodologyChemicalComposition: [pathOr('', ['data', 'descriptionOfMethodologyChemicalComposition'])(inputFraction), Validators.required], // tslint:disable-line
        massOfExternalJacket: [pathOr(null, ['data', 'massOfExternalJacket'])(inputFraction), Validators.required],
        massOfOuterCasings: [pathOr(null, ['data', 'massOfOuterCasings'])(inputFraction), Validators.required],
      })
    });
  }

  // Todo: Add type
  public getInputFractionElementFormGroup(element: any): FormGroup {
    return this.formBuilder.group({
      element: [pathOr('', ['element'])(element), Validators.required],
      share: [pathOr(null, ['share'])(element)],
      mass: [pathOr(null, ['mass'])(element), Validators.required],
    });
  }

  // Todo: Add type
  public getInputFractionElementsFormArray(elements: any[]): FormArray {
    return this.formBuilder.array(elements.map((element) => {
      return this.getInputFractionElementFormGroup(element);
    }));
  }

  // Todo: Add type
  public getInputFractionsFormArray(inputFractions: any[]): FormArray {
    return this.formBuilder.array(inputFractions.map((fraction) => {
      return this.getInputFractionFormGroup(fraction);
    }));
  }

  public addInputFraction(siteRef: string): void {
    (this.formGroup.get('inputFraction') as FormArray).push(this.getInputFractionFormGroup({
      siteRef,
    }));
  }

  // Todo: Add type
  public getAdditiveFormGroup(additive: any): FormGroup {
    return this.formBuilder.group({
      siteRef: pathOr(null, ['siteRef'])(additive),
      data: this.formBuilder.group({
        type: [pathOr('', ['data', 'type'])(additive), Validators.required],
        weight: [pathOr(null, ['data', 'weight'])(additive), Validators.required],
      })
    });
  }

  // Todo: Add type
  public getAdditivesFormArray(additives: any[]): FormArray {
    return this.formBuilder.array(additives.map((additive) => {
      return this.getAdditiveFormGroup(additive);
    }));
  }

  public addAdditive(siteRef: string): void {
    (this.formGroup.get('additives') as FormArray).push(this.getAdditiveFormGroup({
      siteRef,
    }));
  }

  // Todo: Add type
  public getOutputFractionElementFormGroup(element: any): FormGroup {
    return this.formBuilder.group({
      element: [pathOr('', ['element'])(element), Validators.required],
      mass: [pathOr(null, ['mass'])(element), Validators.required],
      virginClassification: [pathOr('', ['virginClassification'])(element), Validators.required],
      virginReplacedMaterial: [pathOr('', ['virginReplacedMaterial'])(element), Validators.required],
      elementClassification: [pathOr('', ['elementClassification'])(element), Validators.required],
      elementReplacedMaterial: [pathOr('', ['elementReplacedMaterial'])(element), Validators.required],
    });
  }

  // Todo: Add type
  public getOutputFractionElementFormArray(outputFractionElements: any[]): FormArray {
    return this.formBuilder.array(outputFractionElements.map((element) => {
      return this.getOutputFractionElementFormGroup(element);
    }));
  }

  // Todo: Add type
  public getOutputFractionFormGroup(fraction: any): FormGroup {
    return this.formBuilder.group({
      siteRef: pathOr(null, ['siteRef'])(fraction),
      data: this.getOutputFractionElementFormArray(pathOr([null], ['data'])(fraction)),
    });
  }

  // Todo: Add type
  public getOutputFractionsFormArray(outputFractions: any[]): FormArray {
    return this.formBuilder.array(outputFractions.map((fraction) => {
      return this.getOutputFractionFormGroup(fraction);
    }));
  }

  public addOutputFraction(siteRef: string): void {
    (this.formGroup.get('outputFraction') as FormArray).push(this.getOutputFractionFormGroup({
      siteRef,
    }));
  }

  // Todo: Add type
  public getRecyclingEfficiencyFormGroup(recyclingEfficiency: any): FormGroup {
    return this.formBuilder.group({
      calculatedEfficiency: [pathOr(null, ['calculatedEfficiency'])(recyclingEfficiency), Validators.required],
    });
  }

  // Todo: Add type
  public getAdditionalInformationFormGroup(additionalInformation: any): FormGroup {
    return this.formBuilder.group({
      files: [pathOr([], ['files'])(additionalInformation)],
      additionalInformation: [pathOr('', ['additionalInformation'])(additionalInformation)],
    });
  }
}
