import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { AssetsRepository } from '@api/assets';

import { FormDataService } from '../../../../services/formdata.service';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './additional-information.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInformationPageComponent extends StepPageAbstract implements OnInit, AfterViewInit {
  public form: any;
  public uploadResult$: Observable<any>;
  public filesArray = [];

  constructor(
    codesService: CodesService,
    formData: FormDataService,
    toastrService: ToastrService,
    reportsProcessActions: ReportsProcessActions,
    router: Router,
    activatedRoute: ActivatedRoute,
    reportActions: ReportsActions,
    private assetsRepository: AssetsRepository,
    private cdRef: ChangeDetectorRef
  ) {
    super(
      codesService,
      formData,
      toastrService,
      reportsProcessActions,
      router,
      activatedRoute,
      reportActions,
      {
        prevStep: ['../recycling-efficiency'],
        nextStep: ['../file-report'],
        formSection: 'additionalInformation'
      }
    );
  }

  public ngOnInit() {
    this.form = this.formData.getFormData().get('additionalInformation');
  }

  public ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  public onUpload(filesList: FileList) {
    Array.from(filesList).forEach((file, index) => {
      console.log(filesList[index]);
      this.uploadResult$ = this.assetsRepository.upload(filesList[index]);
      this.uploadResult$
      .pipe(
        takeUntil(this.componentDestroyed$),
      )
      .subscribe((response) => {
        if (response && response.result) {
          const files = this.form.get('files').value || [];
          console.log(files);
          (this.form.get('files') as FormGroup).setValue([
            ...files,
            response.result,
          ]);
        }
      });
    });
  }

  public onFormReady() {}
}
