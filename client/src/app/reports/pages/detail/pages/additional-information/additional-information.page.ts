import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetsRepository } from '@api/assets';
import { map } from 'rxjs/operators';

import { FormDataService } from '../../../../services/formdata.service';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { combineLatest, of, Observable } from 'rxjs';
import { UPLOAD_CONSTS } from '@ui/upload/components/multiple-file-upload/multiple-file-upload.const';

@Component({
  templateUrl: './additional-information.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInformationPageComponent extends StepPageAbstract implements OnInit, AfterViewInit {
  public form: any;
  public uploadResult$: Observable<any[]>;
  public storedFiles: any[];
  public uploadTypes = UPLOAD_CONSTS;
  public files = [];

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
    super.ngOnInit();
    this.form = this.formData.getFormData().get('additionalInformation');
    this.fetchStoredFilesIfNeeded();
  }

  public ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  public onFormReady() {}

  public onUpload(filesList: FileList) {
    console.log(filesList);
    Array.from(filesList).forEach(file => {
      this.files.push(this.assetsRepository.upload(file));
    });
    this.uploadResult$ = combineLatest(...this.files);
  }

  public fetchStoredFilesIfNeeded() {
    if (this.formData.getFormData().get('additionalInformation.files').value.length > 0) {
      this.storedFiles = this.formData.getFormData().get('additionalInformation.files').value.map(file => {
        return {
          progress: 100,
          originalname: file.originalname,
          result: file,
        };
      });
    }
  }

  public onRemoveFile(fileToRemove) {
    if (fileToRemove.type === this.uploadTypes.STORED) {
      this.storedFiles.splice(fileToRemove.index, 1);
      this.storedFiles = [].concat(this.storedFiles);
    }
    if (fileToRemove.type === this.uploadTypes.NEW) {
      this.uploadResult$ = this.uploadResult$.pipe(
        map((file) => {
          this.files.splice(fileToRemove.index, 1);
          return file.slice(0, fileToRemove.index).concat(file.slice(fileToRemove.index + 1));
        })
      );
    }
  }
}
