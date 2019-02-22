import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '@helpers/form.helper';
import { AssetsRepository } from '@api/assets';

import { FormDataService } from '../../../../services/formdata.service';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportProcessActions } from 'src/app/reports/store/recycling-processes';

@Component({
  templateUrl: './additional-information.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInformationPageComponent extends StepPageAbstract implements OnInit, AfterViewInit {
  public form: any;
  public uploadResult;
  public filesArray = [];

  constructor(
    codesService: CodesService,
    formData: FormDataService,
    toastrService: ToastrService,
    reportProcessActions: ReportProcessActions,
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
      reportProcessActions,
      router,
      activatedRoute,
      reportActions,
      {
        prevStep: 'recycling-efficiency',
        nextStep: 'file-report',
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

  public onUpload(filesList) {
    this.uploadResult = this.assetsRepository.upload(filesList[0]);
  }

  public onFormReady() {}
}
