import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ToastrService } from 'ngx-toastr';
import { ReportsActions } from '../../../../store/reports';

@Component({
  templateUrl: './file.page.html',
})

export class FilePageComponent implements OnInit {
  public form: any;

  constructor(
      public codesService: CodesService,
      public formData: FormDataService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private reportActions: ReportsActions
  ) {}

  public ngOnInit() {
    this.form = this.formData.getFormData();
  }

  public save() {
    const data = {
      _id: '5c6eb3b38f502f00387a8f16',
      data: this.form.getRawValue(),
    };

    let promise: Promise<any>;
    promise = this.reportActions.draft(data).toPromise();
        promise.then((response) => {
            console.log(response);
        })
        .catch(() => {});
  }

  public file() {
    const data = {
      _id: '5c6eb3b38f502f00387a8f16',
      data: this.form.getRawValue(),
    };

    let promise: Promise<any>;
    promise = this.reportActions.file(data).toPromise();
        promise.then((response) => {
            console.log(response);
        })
        .catch(() => {});
  }

  public previousStep() {
    this.router.navigate(['../additional-information'], {relativeTo: this.activatedRoute}, );
  }
}
