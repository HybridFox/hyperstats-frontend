import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '@helpers/form.helper';
import { select$ } from '@angular-redux/store';
import { ReportsProcessSelector } from '../../../../store/recycling-processes/selectors';
import { Observable } from 'rxjs';
import { mapRecyclingProcessesToOptions } from '../../../../services/select.helpers';

import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  templateUrl: './new.page.html',
})
export class NewPageComponent implements OnInit {
  @select$(ReportsProcessSelector.recyclingProcesses, mapRecyclingProcessesToOptions) recyclingProcesses$: Observable<any>;

  public mappedRecyclingProcesses$: Observable<any>;
  public form: any;

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.form = this.formData.getFormData().get('information');
  }

  public nextStep() {
    FormHelper.markAsDirty(this.form);

    if (this.form.valid) {
      this.router.navigate(['../input-fraction'], {relativeTo: this.activatedRoute});
    } else {
      this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);
    }
  }
}
