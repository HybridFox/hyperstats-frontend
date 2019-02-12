import { Component, OnInit, OnDestroy, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { select, select$ } from '@angular-redux/store';
import * as uuid from 'uuid';
import { omit, prop, pathOr, equals } from 'ramda';
import { Observable, Subscription, Subject } from 'rxjs';
import { filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RecyclingProcessesActions, RecyclingProcessesSelectors } from '../../store';
import { METHODS_OF_PROCESSING } from 'src/lib/constants';
import { RecyclingPartnerActions, RecyclingPartnerSelector } from 'src/app/recycling-partners/store';
import { recyclingPartnersToSelectOptions } from './select.helpers';

@Component({
  templateUrl: './recycling-process.page.html',
})
export class RecyclingProcessPageComponent implements OnInit, OnDestroy {
    @select(RecyclingProcessesSelectors.detail.result) public $process: Observable<any>;
    @select$(RecyclingPartnerSelector.list.result, recyclingPartnersToSelectOptions) public partnerOptions$: Observable<any[]>;

    public recyclingProcessForm: any;
    public process: any;
    public methodsOfProcessing: any[] = METHODS_OF_PROCESSING;

    private recyclingProcessId: string;
    private processSubscription: Subscription;
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private processActions: RecyclingProcessesActions,
        private partnerActions: RecyclingPartnerActions,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translateService: TranslateService,
    ) {}

    public ngOnInit() {
        this.setupForm();
        this.partnerActions.fetchAll().toPromise();
        this.route.params
            .pipe(
                takeUntil(this.componentDestroyed$),
                distinctUntilChanged()
            )
            .subscribe((params) => {
                this.recyclingProcessId = params.recyclingProcess;

                this.fetchProcessIfNeeded();
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public getStepKey(key: string) {
        return parseInt(key, 16) + 1;
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

    public addStep(): void {
        this.recyclingProcessForm.controls.steps.push(this.createStep());
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

    public save() {
        if (this.recyclingProcessForm.invalid) {
            return;
        }

        const rawValue = this.recyclingProcessForm.getRawValue();
        const toSave = {
            ...this.process,
            data: {
                ...rawValue,
            }
        };
        let promise;

        if (this.recyclingProcessId !== 'new') {
            promise = this.processActions.update(toSave).toPromise();
        } else {
            promise = this.processActions.create(toSave).toPromise();
        }

        promise
            .then((response) => {
                this.toastrService.success(
                    ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.SUCCESS.DESCRIPTION') as string,
                    ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.SUCCESS.TITLE') as string
                );

                this.router.navigate([`../${response._id}`], { relativeTo: this.route });
            })
            .catch(() => {
                this.toastrService.error(
                    ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.ERROR.DESCRIPTION') as string,
                    ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.ERROR.TITLE') as string
                );
            });
    }

    public remove() {
        if (this.recyclingProcessId === 'new') {
            return;
        }

        this.processActions.delete(this.process._id)
            .toPromise()
            .then((response) => {
                this.toastrService.success(
                    ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.SUCCESS.DESCRIPTION') as string,
                    ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.SUCCESS.TITLE') as string
                );

                this.router.navigate(['../'], { relativeTo: this.route });
            })
            .catch(() => {
                this.toastrService.error(
                    ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.ERROR.DESCRIPTION') as string,
                    ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.ERROR.TITLE') as string
                );
            });
    }

    private setupForm(process?: any): void {
        this.recyclingProcessForm = this.formBuilder.group({
            name: [pathOr('', ['data', 'name'])(process), Validators.required],
            steps: this.createStepFormGroups(pathOr([], ['data', 'steps'])(process))
        });
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
            asset: ''
        },
        schematicOverview: ''
    }): FormGroup {
        return this.formBuilder.group({
            uuid: [step.uuid],
            precedingStep: [step.precedingStep],
            description: [step.description, Validators.required],
            site: [step.site, Validators.required],
            methodOfProcessing: [step.methodOfProcessing, Validators.required],
            qualitativeDescription: this.formBuilder.group({
                text: [step.qualitativeDescription.text, Validators.required],
                asset: [step.qualitativeDescription.asset]
            }),
            schematicOverview: [step.schematicOverview],
        });
    }

    private fetchProcessIfNeeded(): void {
        if (!this.recyclingProcessId || (this.process && prop('_id', this.process) === this.recyclingProcessId)) {
            return;
        }

        if (this.processSubscription) {
            this.processSubscription.unsubscribe();
        }

        if (this.recyclingProcessId === 'new') {
            return this.setupForm();
        }

        this.processActions.fetchById(this.recyclingProcessId).toPromise();
        this.processSubscription = this.$process
            .pipe(takeUntil(this.componentDestroyed$))
            .pipe(filter((process) => process && !equals(process, this.process)))
            .subscribe((process) => {
                this.process = process;

                this.setupForm(this.process);
            });
    }
}



