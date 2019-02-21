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
      data: this.form.getRawValue(),
      meta: {
        status: 'SAVED',
      }
    };
    console.log(data);

    let promise: Promise<any>;
    promise = this.reportActions.createDrafted(data).toPromise();
        promise.then((response) => {
            console.log(response);
        })
        .catch(() => {});
  }

  public file() {
    let promise: Promise<any>;
    promise = this.reportActions.createFiled(this.form.getRawValue()).toPromise();
        promise.then((response) => {
            console.log(response);
        })
        .catch(() => {});
  }

  public previousStep() {
    this.router.navigate(['../additional-information'], {relativeTo: this.activatedRoute});
  }
}
