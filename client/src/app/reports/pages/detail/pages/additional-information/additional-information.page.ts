import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetsRepository } from '@api/assets';

import { FormDataService } from '../../../../services/formdata.service';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { of } from 'rxjs';
import { UPLOAD_STATES } from '@ui/upload/components/multiple-file-upload/multiple-file-upload.const';

@Component({
  templateUrl: './additional-information.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInformationPageComponent extends StepPageAbstract implements OnInit, AfterViewInit {
  public form: any;
  public uploadResult: any;
  public filesArray: [];
  public uploadStates: any[] = UPLOAD_STATES;

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
    this.fetchFilesIfNeeded();
  }

  public ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  public onFormReady() {
    this.formData.getFormMetaData().get('additionalInformation').setValue(false);
  }

  public onUpload(filesList: FileList) {
    this.fetchFilesIfNeeded();
    if (this.uploadResult) {
      Array.from(filesList).map(file => {
        this.uploadResult.push({
          state: this.uploadStates[0].state,
          file: this.assetsRepository.upload(file)
        });
      });
    } else {
      this.uploadResult = Array.from(filesList).map(file => {
        return {
          state: this.uploadStates[0].state,
          file: this.assetsRepository.upload(file)
        };
      });
    }
    this.uploadResult = [].concat(this.uploadResult);
  }

  public fetchFilesIfNeeded() {
    if (this.formData.getFormData().get('additionalInformation.files').value.length > 0 && !this.uploadResult) {
      this.uploadResult = this.formData.getFormData().get('additionalInformation.files').value.map(file => {
        const fileObject = {
          progress: 100,
          originalname: file.originalname,
          result: file,
        };
        return {
          state: this.uploadStates[1].state,
          file: of(fileObject),
        };
      });
    }
  }

  public onRemoveFile(index) {
    if (this.uploadResult) {
      this.uploadResult.splice(index, 1);
      this.uploadResult = [].concat(this.uploadResult);
    } else {
      this.uploadResult = this.formData.getFormData().get('additionalInformation.files').value
        .map(file => {
          const fileObject = {
            progress: 100,
            originalname: file.originalname,
            result: file,
          };
          return of(fileObject);
        });
      this.uploadResult.splice(index, 1);
      this.uploadResult = [].concat(this.uploadResult);
    }
  }
}
