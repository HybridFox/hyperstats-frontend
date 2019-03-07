import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy,
    ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { TranslateService } from '@ngx-translate/core';
import { createFileUploadControl } from '@ui/upload/file-upload.helper';
import { omit, prop, pathOr } from 'ramda';

import { METHODS_OF_PROCESSING } from 'src/lib/constants';
import { UPLOAD_TYPES } from '@ui/upload/components/single-file-upload/single-file-upload.const';
import * as uuid from 'uuid';
import { Toggle, Remove } from './recycling-process.interface';



@Component({
    selector: 'app-recycling-process-form',
    templateUrl: './recycling-process-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RecyclingProcessFormComponent implements OnChanges, AfterViewInit {
    @Input() public recyclingProcess: any;
    @Input() public recyclingPartners: any;
    @Input() public uploadResponse: any;
    @Input() public user: any;

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
    public uploadTypes: any[] = UPLOAD_TYPES;
    public recyclingProcessId: string;
    public isActivated: boolean;
    public isDuplicate: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private translateService: TranslateService,
        private cdRef: ChangeDetectorRef,
    ) {}

    ngAfterViewInit() {
        this.cdRef.detectChanges();
    }

    public ngOnChanges(changes: SimpleChanges) {
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
    }

    public saveForm() {
        if (this.recyclingProcessForm.invalid) {
            this.validateFormFields(this.recyclingProcessForm);
            return;
        }
        this.isDuplicate = false;
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
        this.toggleActivation.emit({id: this.recyclingProcess._id, isActivated: this.isActivated});
    }

    public duplicateProcess() {
        this.isDuplicate = true;
        this.duplicate.emit(this.recyclingProcess._id);
    }

    private createStepFormGroups(steps: any[]): FormArray {
        if (!steps.length) {
            return this.formBuilder.array([this.createStep()]);
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
            precedingStep: [step.precedingStep],
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
            value: null
        }]);
    }

    public deleteStep(key: number) {
        this.recyclingProcessForm.controls.steps.controls.splice(key, 1);
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
    }

    public onUpload(fileList: FileList, stepIndex: number, input: String) {
        this.upload.emit({
            input,
            stepIndex,
            fileList
        });
    }

    public onRemoveFile(stepIndex: number, input: String) {
      this.removeFile.emit({stepIndex, input});
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
