import { Component, OnInit, ChangeDetectionStrategy,ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormDataService } from '../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '@helpers/form.helper';
import { AssetsRepository } from '@api/assets';

@Component({
  templateUrl: './additional-information.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdditionalInformationPageComponent implements OnInit, AfterViewInit {
  public form: any;
  public uploadResult;
  public filesArray = [];

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private assetsRepository: AssetsRepository,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    this.form = this.formData.getFormData().get('additionalInformation');
  }

  public ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  public previousStep() {
    this.router.navigate(['../recycling-efficiency'], {relativeTo: this.activatedRoute});
  }

  public nextStep() {
    FormHelper.markAsDirty(this.form);

    if (this.form.valid) {
      this.router.navigate(['../file-report'], {relativeTo: this.activatedRoute});
    } else {
      this.toastrService.error('GENERAL.LABELS.INVALID_FORM');
    }
  }

  public onUpload(filesList) {
    this.uploadResult = this.assetsRepository.upload(filesList[0]);

    /* Array.from(filesList).map(file => {
      this.uploadResult = this.assetsRepository.upload(file);
      this.filesArray.push(this.uploadResult);
    }); */
  }
}
