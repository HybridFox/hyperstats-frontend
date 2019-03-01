import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetsRepository } from '@api/assets';

import { FormDataService } from '../../../../services/formdata.service';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';

@Component({
  templateUrl: './additional-information.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInformationPageComponent extends StepPageAbstract implements OnInit, AfterViewInit {
  public form: any;
  public uploadResult: any;
  public filesArray: [];

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
    if (this.uploadResult) {
      Array.from(filesList).map(file => {
        this.uploadResult.push(this.assetsRepository.upload(file));
      });
    } else {
      this.uploadResult = Array.from(filesList).map(file => {
        return this.assetsRepository.upload(file);
      });
    }
    this.uploadResult = [].concat(this.uploadResult);
  }

  public onFormReady() {}
}
