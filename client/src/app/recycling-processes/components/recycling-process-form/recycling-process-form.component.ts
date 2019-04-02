import {
  Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy,
  ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { createFileUploadControl } from '@ui/upload/file-upload.helper';
import { omit, prop, pathOr } from 'ramda';
import { select } from '@angular-redux/store';

import { METHODS_OF_PROCESSING } from 'src/lib/constants';
import * as uuid from 'uuid';
import { Toggle, Remove } from './recycling-process.interface';
import { UPLOAD_CONSTS } from '@ui/upload/components/multiple-file-upload/multiple-file-upload.const';

import { Report } from '../../../reports/store/reports/types';
import { RecyclingProcess } from '../../../reports/store/recycling-processes/types';
import { ReportsSelector } from '../../../reports/store/reports';
import { PROCESS_REPORT_STATE } from './recycling-process.interface';

@Component({
  selector: 'app-recycling-process-form',
  templateUrl: './recycling-process-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RecyclingProcessFormComponent implements OnChanges, AfterViewInit {
  @select(ReportsSelector.list.result) public reports$: Observable<Report[]>;

  @Input() public recyclingProcess: RecyclingProcess;
  @Input() public recyclingPartners: any[];
  @Input() public uploadResponse: any;
  @Input() public user: any;
  @Input() public isDuplicate: boolean;

  @Output() public submit: EventEmitter<FormArray> = new EventEmitter<FormArray>();
  @Output() public remove: EventEmitter<string> = new EventEmitter<string>();
  @Output() public toggleActivation: EventEmitter<Toggle> = new EventEmitter<Toggle>();
  @Output() public duplicate: EventEmitter<string> = new EventEmitter<string>();
  @Output() public upload: EventEmitter<any> = new EventEmitter<any>();
  @Output() public uploadAsset: EventEmitter<object> = new EventEmitter<object>();
  @Output() public uploadOverview: EventEmitter<object> = new EventEmitter<object>();
  @Output() public removeFile: EventEmitter<Remove> = new EventEmitter<Remove>();

  public recyclingProcessForm: any;
  public methodsOfProcessing: any[] = METHODS_OF_PROCESSING;
  public uploadTypes = UPLOAD_CONSTS;
  public isActivated: boolean;
  public processReportStatus: string = PROCESS_REPORT_STATE.NOT_USED;
  public formDisabled = false;
  public deleteConfirmMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.recyclingProcess && changes.recyclingProcess.currentValue !== changes.recyclingProcess.previousValue) {
      this.processReportStatus = '';
      this.checkProcessReportStatus();
    }

    if (this.recyclingPartners && changes.recyclingPartners) {
      const ownCompany = {
        value: this.user.company._id,
        label: this.user.company.data.name,
      };
      this.recyclingPartners.unshift(ownCompany);
    }

    if (changes.recyclingProcess) {
      this.recyclingProcessForm = this.formBuilder.group({
        name: [pathOr('', ['data', 'name'])(this.recyclingProcess), Validators.required],
        steps: this.createStepFormGroups(pathOr([], ['data', 'steps'])(this.recyclingProcess))
      });
    }

    this.reports$.subscribe(reports => {
      if (reports && this.recyclingProcess) {
        this.processReportStatus = reports.reduce((currentStatus, report) => {
          const recyclingProcess = pathOr('', ['data', 'information', 'recyclingProcess'])(report);
          if (pathOr(null, ['_id'])(this.recyclingProcess) === pathOr(recyclingProcess, ['_id'])(recyclingProcess)) {
            if (currentStatus !== PROCESS_REPORT_STATE.FILED) {
              return report.meta.status;
            }
          }

          return currentStatus;
        }, PROCESS_REPORT_STATE.NOT_USED);

        if (this.processReportStatus === PROCESS_REPORT_STATE.SAVED) {
          const itemsToDelete = reports.filter(report => {
            const recyclingProcess = pathOr('', ['data', 'information', 'recyclingProcess'])(report);
            return pathOr(null, ['_id'])(this.recyclingProcess)  === pathOr(recyclingProcess, ['_id'])(recyclingProcess)
              && (report.meta.status === PROCESS_REPORT_STATE.SAVED);
          });

          this.deleteConfirmMessage = itemsToDelete.reduce((acc, curr, index) => {
            if (index === 0) {
              return `${acc} ${curr.data.information.name}`;
            }
            if (index === itemsToDelete.length - 1) {
              return `${acc} and ${curr.data.information.name}.`;
            }
            return `${acc}, ${curr.data.information.name}`;
          }, 'If you delete this process you delete the following reports:');
        }
      }
    });

    this.checkProcessReportStatus();
  }

  public saveForm() {
    if (this.recyclingProcessForm.invalid) {
      this.validateFormFields(this.recyclingProcessForm);
      return;
    }

    this.submit.emit(this.recyclingProcessForm);
  }

  public removeForm() {
    if (!prop('_id')(this.recyclingProcess)) {
      return;
    }

    this.remove.emit(this.recyclingProcess._id);
  }

  public toggleActivationForm() {
    this.isActivated = !this.isActivated;
    this.toggleActivation.emit({ id: this.recyclingProcess._id, isActivated: this.isActivated });
  }

  public duplicateProcess() {
    this.duplicate.emit(this.recyclingProcess._id);

    this.processReportStatus = '';
    this.checkProcessReportStatus();
  }

  private checkProcessReportStatus() {
    if (this.processReportStatus === PROCESS_REPORT_STATE.FILED) {
      this.recyclingProcessForm.disable();
      this.formDisabled = true;

      return;
    }
    if (this.recyclingProcessForm) {
      this.recyclingProcessForm.enable();
    }
    this.formDisabled = false;
  }

  private createStepFormGroups(steps: any[]): FormArray {
    if (!steps.length) {
      const newStepForm = this.formBuilder.array([this.createStep()]);
      newStepForm.controls[0].get('precedingStep').setValue('none');
      return newStepForm;
    }

    return this.formBuilder.array(steps.map((step) => this.createStep(step)));
  }

  private createStep(step = {
    uuid: uuid.v4(),
    precedingStep: 0,
    description: '',
    site: '',
    methodOfProcessing: '',
    qualitativeDescription: {
      text: '',
      asset: undefined
    },
    schematicOverview: undefined
  }): FormGroup {
    return this.formBuilder.group({
      uuid: [step.uuid],
      precedingStep: [step.precedingStep, Validators.required],
      description: [step.description, Validators.required],
      site: [step.site, Validators.required],
      methodOfProcessing: [step.methodOfProcessing, Validators.required],
      qualitativeDescription: this.formBuilder.group({
        text: [step.qualitativeDescription.text, Validators.required],
        asset: createFileUploadControl(step.qualitativeDescription.asset)
      }),
      schematicOverview: createFileUploadControl(step.schematicOverview),
    });
  }

  public getStepKey(key: string) {
    return parseInt(key, 16) + 1;
  }

  public precedingSteps(step: FormControl) {
    return this.recyclingProcessForm.controls.steps.controls.reduce((acc: any[], x: any, key: number) => {
      if (step.value.value.uuid === x.value.uuid) {
        return acc;
      }

      const label = x.value.description
        ? x.value.description
        : `${this.translateService.instant('PAGE.RECYCLING-PROCESSES.RECYCLING-STEP', { key: key + 1 })}`;

      acc.push({
        label: x.value.methodOfProcessing ? `${label} (${x.value.methodOfProcessing})` : label,
        value: x.value.uuid
      });

      return acc;
    }, [{
      label: ngxExtract('PAGE.RECYCLING-PROCESSES.PRECEDING-STEP.NONE'),
      value: 'none'
    }]);
  }

  public deleteStep(key: number) {
    this.recyclingProcessForm.controls.steps.controls.splice(key, 1);
    const steps = this.recyclingProcessForm.controls.steps.controls;
    if (steps.length > 1) {
      steps[key].get('precedingStep').setValue(steps[key - 1].value.uuid);
    }
  }

  public duplicateStep(key: number) {
    const newStep = this.createStep();
    newStep.patchValue(
      omit(['uuid'], this.recyclingProcessForm.controls.steps.controls[key].value)
    );
    this.recyclingProcessForm.controls.steps.push(newStep);
  }

  public newStep(): void {
    this.recyclingProcessForm.controls.steps.push(this.createStep());
    const steps = this.recyclingProcessForm.controls.steps.controls;
    steps[steps.length - 1].get('precedingStep').setValue(steps[steps.length - 2].value.uuid);
  }

  public onUpload(fileList: FileList, stepIndex: number, input: String) {
    this.upload.emit({
      input,
      stepIndex,
      fileList
    });
  }

  public onRemoveFile(stepIndex: number, input: String) {
    this.removeFile.emit({ stepIndex, input });
  }

  public validateFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        for (const step of control.controls) {
          if (step instanceof FormControl) {
            step.markAsDirty({
              onlySelf: true
            });
          }
          if (step instanceof FormGroup) {
            this.validateFormFields(step);
          }
        }
      } else if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateFormFields(control);
      }
    });
  }
}
