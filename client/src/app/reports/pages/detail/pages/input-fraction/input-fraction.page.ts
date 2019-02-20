import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { FormHelper } from '@helpers/form.helper';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  templateUrl: './input-fraction.page.html',
})
export class InputFractionPageComponent implements OnInit {
  public form: any;

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.form = this.formData.getFormData().get('inputFraction');
  }

  public addElement() {
    this.formData.addInputElement();
  }

  public previousStep() {
    this.router.navigate(['../information'], {relativeTo: this.activatedRoute});
  }

  public nextStep() {
    FormHelper.markAsDirty(this.form);

    if (this.form.valid) {
      this.router.navigate(['../additives'], {relativeTo: this.activatedRoute});
    } else {

      this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);    }
  }
}
