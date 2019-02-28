import { Component, OnChanges, Input } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray } from '@angular/forms';

import { FormDataService } from '../../services/formdata.service';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';

import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

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
    setTimeout(() => {
      this.setActiveStepById();
    }, 100);
  }

  private setActiveStepById() {
    const stepIndex = this.inputFractionsForm.getRawValue().findIndex((step) => step.siteRef === this.siteRef);
    if (stepIndex !== -1) {
      this.form = this.inputFractionsForm.get(`${stepIndex}`) as FormGroup;
    } else {
      this.formData.addInputFraction(this.siteRef);
      this.setActiveStepById();
    }
  }
}
