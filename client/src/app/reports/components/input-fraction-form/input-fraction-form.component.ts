import { Component, OnChanges, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

import { FormDataService } from '../../services/formdata.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-fraction-form',
  templateUrl: './input-fraction-form.component.html',
})
export class InputFractionFormComponent implements OnChanges {
  @Input() public inputFractionsForm: FormArray;
  @Input() public siteRef: string;
  @Input() public elements: string;

  public form: FormGroup;

  constructor(
    private formData: FormDataService,
  ) {}

  public ngOnChanges() {
    this.setActiveStepById();
  }

  public addElement() {
    const stepIndex = this.inputFractionsForm.getRawValue().findIndex((step) => step.siteRef === this.siteRef);
    (this.inputFractionsForm.controls[stepIndex].get('data.elements') as FormArray)
      .push(this.formData.getInputFractionElementFormGroup(null));
  }

  public removeElement(elementNumber: number) {
    const stepIndex = this.inputFractionsForm.getRawValue().findIndex((step) => step.siteRef === this.siteRef);
    (this.inputFractionsForm.controls[stepIndex].get('data.elements') as FormArray).removeAt(elementNumber);
  }

  private setActiveStepById() {
    const stepIndex = this.inputFractionsForm.getRawValue().findIndex((step) => step.siteRef === this.siteRef);
    if (stepIndex !== -1) {
      this.form = this.inputFractionsForm.get(`${stepIndex}`) as FormGroup;
    } else {
      this.setActiveStepById();
    }
  }
}
