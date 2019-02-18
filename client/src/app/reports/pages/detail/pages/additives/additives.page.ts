import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { FormHelper } from '@helpers/form.helper';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './additives.page.html',
})
export class AdditivesPageComponent implements OnInit {
  public form: any;

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.form = this.formData.getFormData().get('additives');
  }

  public addAdditive() {
    this.formData.addAdditive();
  }

  public previousStep() {
    this.router.navigate(['../input-fraction'], {relativeTo: this.activatedRoute});
  }

  public nextStep() {
    FormHelper.markAsDirty(this.form);

    if (this.form.valid) {
      this.router.navigate(['../output-fraction'], {relativeTo: this.activatedRoute});
    } else {
      this.toastrService.error('GENERAL.LABELS.INVALID_FORM');
    }
  }
}
