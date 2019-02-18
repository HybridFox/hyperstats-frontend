import { Component, OnChanges, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { prop, pathOr, omit } from 'ramda';
import { METHODS_OF_PROCESSING } from 'src/lib/constants';
import * as uuid from 'uuid';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { TranslateService } from '@ngx-translate/core';
import { createFileUploadControl } from '@ui/form-fields/components/file-upload/file-upload.helper';
import { Observable } from 'rxjs';
import { RecyclingPartnerSelector } from 'src/app/recycling-partners/store';
import { recyclingPartnersToSelectOptions } from './select.helpers';
import { select$ } from '@angular-redux/store';

@Component({
    selector: 'app-recycling-process-form',
    templateUrl: './recycling-process-form.html'
})

export class RecyclingProcessFormComponent implements OnChanges {
    @select$(RecyclingPartnerSelector.list.result, recyclingPartnersToSelectOptions) public partnerOptions$: Observable<any[]>;
    @Input() public recyclingProcess: any;

    @Output() public submit: EventEmitter<FormArray> = new EventEmitter<FormArray>();
    @Output() public remove: EventEmitter<string> = new EventEmitter<string>();
    @Output() public toggleActivation: EventEmitter<{
        id: string,
        isActivated: boolean
    }> = new EventEmitter<{
        id: string,
        isActivated: boolean
    }>();
    @Output() public duplicate: EventEmitter<string> = new EventEmitter<string>();

    public recyclingProcessForm: any;
    public methodsOfProcessing: any[] = METHODS_OF_PROCESSING;
    public recyclingProcessId: string;
    public isActivated: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private translateService: TranslateService
    ) {}

    public ngOnChanges() {
        this.recyclingProcessForm = this.formBuilder.group({
            name: [pathOr('', ['data', 'name'])(this.recyclingProcess), Validators.required],
            steps: this.createStepFormGroups(pathOr([], ['data', 'steps'])(this.recyclingProcess))
        });
    }

    public saveForm() {
        if (this.recyclingProcessForm.invalid) {
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
        this.toggleActivation.emit({id: this.recyclingProcess._id, isActivated: this.isActivated});
    }

    public duplicateProcess() {
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
}
