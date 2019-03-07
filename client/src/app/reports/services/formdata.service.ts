import { Injectable } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import pathOr from 'ramda/es/pathOr';

import {
  Report,
  Information,
  InputFraction,
  OutputFraction,
  AdditionalElement,
  RecyclingEfficiency,
  AdditionalInformation,
  Additives,
  AdditivesData,
  SiteRef
} from '../store/reports/types';

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

  public initForm(report: Report) {
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

  public getInformationFormGroup(information: Information): FormGroup {
    return this.formBuilder.group({
      reportingYear: [pathOr(null, ['reportingYear'])(information), Validators.required],
      recyclingProcess: [pathOr(null, ['recyclingProcess'])(information), Validators.required],
      name: [pathOr('', ['name'])(information), Validators.required],
    });
  }

  public getInputFractionFormGroup(inputFraction: InputFraction | SiteRef): FormGroup {
    return this.formBuilder.group({
      siteRef: pathOr('', ['siteRef'])(inputFraction),
      data: this.formBuilder.group({
        processChemistry: [pathOr('', ['data', 'processChemistry'])(inputFraction), Validators.required],
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

  public getInputFractionElementFormGroup(element: AdditionalElement): FormGroup {
    return this.formBuilder.group({
      element: [pathOr('', ['element'])(element), Validators.required],
      mass: [pathOr(null, ['mass'])(element), Validators.required],
    });
  }

  public getInputFractionElementsFormArray(elements: AdditionalElement[]): FormArray {
    return this.formBuilder.array(elements.map((element) => {
      return this.getInputFractionElementFormGroup(element);
    }));
  }

  public getInputFractionsFormArray(inputFractions: InputFraction[]): FormArray {
    return this.formBuilder.array(inputFractions.map((fraction) => {
      return this.getInputFractionFormGroup(fraction);
    }));
  }

  public addInputFraction(siteRef: string): void {
    (this.formGroup.get('inputFraction') as FormArray).push(this.getInputFractionFormGroup({
      siteRef,
    }));
  }

  public clearInputFractions(): void {
    while ((this.formGroup.get('inputFraction') as FormArray).controls.length > 0) {
      (this.formGroup.get('inputFraction') as FormArray).removeAt(0);
    }
  }

  public getAdditive(additiveItem: AdditivesData): FormGroup {
    return this.formBuilder.group({
      type: [pathOr('', ['type'])(additiveItem), Validators.required],
      weight: [pathOr(null, ['weight'])(additiveItem), Validators.required],
    });
  }

  public getAdditives(additiveItems: AdditivesData[]): FormArray {
    return this.formBuilder.array(additiveItems.map((element) => {
      return this.getAdditive(element);
    }));
  }

  public getAdditiveFormGroup(additive: Additives | SiteRef): FormGroup {
    return this.formBuilder.group({
      siteRef: pathOr('', ['siteRef'])(additive),
      data: this.getAdditives(pathOr([null], ['data'])(additive)),
    });
  }

  public getAdditivesFormArray(additives: Additives[]): FormArray {
    return this.formBuilder.array(additives.map((additive) => {
      return this.getAdditiveFormGroup(additive);
    }));
  }

  public addAdditive(siteRef: string): void {
    (this.formGroup.get('additives') as FormArray).push(this.getAdditiveFormGroup({
      siteRef,
    }));
  }

  public clearAdditives(): void {
    while ((this.formGroup.get('additives') as FormArray).controls.length > 0) {
      (this.formGroup.get('additives') as FormArray).removeAt(0);
    }
  }

  public getOutputFractionElementFormGroup(element: OutputFraction): FormGroup {
    return this.formBuilder.group({
      element: [pathOr('', ['element'])(element), Validators.required],
      mass: [pathOr(null, ['mass'])(element), Validators.required],
      virginClassification: [pathOr('', ['virginClassification'])(element), Validators.required],
      virginReplacedMaterial: [pathOr('', ['virginReplacedMaterial'])(element), Validators.required],
      elementClassification: [pathOr('', ['elementClassification'])(element), Validators.required],
      elementReplacedMaterial: [pathOr('', ['elementReplacedMaterial'])(element), Validators.required],
    });
  }

  public getOutputFractionElementFormArray(outputFractionElements: OutputFraction[]): FormArray {
    return this.formBuilder.array(outputFractionElements.map((element) => {
      return this.getOutputFractionElementFormGroup(element);
    }));
  }

  public getOutputFractionFormGroup(fraction: OutputFraction | SiteRef): FormGroup {
    return this.formBuilder.group({
      siteRef: pathOr('', ['siteRef'])(fraction),
      data: this.getOutputFractionElementFormArray(pathOr([null], ['data'])(fraction)),
    });
  }

  public getOutputFractionsFormArray(outputFractions: OutputFraction[]): FormArray {
    return this.formBuilder.array(outputFractions.map((fraction) => {
      return this.getOutputFractionFormGroup(fraction);
    }));
  }

  public addOutputFraction(siteRef: string): void {
    (this.formGroup.get('outputFraction') as FormArray).push(this.getOutputFractionFormGroup({
      siteRef,
    }));
  }

  public clearOutputFractions(): void {
    while ((this.formGroup.get('outputFraction') as FormArray).controls.length > 0) {
      (this.formGroup.get('outputFraction') as FormArray).removeAt(0);
    }
  }

  public getRecyclingEfficiencyFormGroup(recyclingEfficiency: RecyclingEfficiency): FormGroup {
    return this.formBuilder.group({
      calculatedEfficiency: [pathOr(null, ['calculatedEfficiency'])(recyclingEfficiency), Validators.required],
    });
  }

  public getAdditionalInformationFormGroup(additionalInformation: AdditionalInformation): FormGroup {
    return this.formBuilder.group({
      files: [pathOr([], ['files'])(additionalInformation)],
      additionalInformation: [pathOr('', ['additionalInformation'])(additionalInformation)],
    });
  }
}
