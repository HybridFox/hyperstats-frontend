import { Component, OnInit, OnDestroy, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import * as uuid from 'uuid';
import { omit, prop, pathOr, equals } from 'ramda';
import { ActivatedRoute, Router } from '@angular/router';
import { RecyclingProcessesActions, RecyclingProcessesSelectors } from '../../store';
import { select } from '@angular-redux/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { METHODS_OF_PROCESSING } from 'src/lib/constants';

@Component({
  selector: 'app-recycling-process-page',
  templateUrl: './recycling-process.page.html',
})
export class RecyclingProcessPageComponent implements OnInit, OnDestroy {
    @select(RecyclingProcessesSelectors.detail.result) public $process: Observable<any>;

    public recyclingProcessForm: any;
    public process: any;
    public methodsOfProcessing: any[] = METHODS_OF_PROCESSING;

    private _recyclingProcessId: string;
    private _processSubscription: Subscription;
    private _componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _processActions: RecyclingProcessesActions,
        private _formBuilder: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _toastrService: ToastrService,
        private _translateService: TranslateService,
    ) {}

    public ngOnInit() {
        this._setupForm();
        this._route.params
            .pipe(
                takeUntil(this._componentDestroyed$),
                distinctUntilChanged()
            )
            .subscribe((params) => {
                this._recyclingProcessId = params.recyclingProcess;

                this._fetchProcessIfNeeded();
            });
    }

    public getStepKey(key: string) {
        return parseInt(key, 16) + 1;
    }

    public deleteStep(key: number) {
        this.recyclingProcessForm.controls.steps.controls.splice(key, 1);
    }

    public duplicateStep(key: number) {
        const newStep = this._createStep();
        newStep.patchValue(
            omit(['uuid'], this.recyclingProcessForm.controls.steps.controls[key].value)
        );
        this.recyclingProcessForm.controls.steps.push(newStep);
    }

    public addStep(): void {
        this.recyclingProcessForm.controls.steps.push(this._createStep());
    }

    public precedingSteps(step: FormControl) {
        return this.recyclingProcessForm.controls.steps.controls.reduce((acc: any[], x: any, key: number) => {
            if (step.value.value.uuid === x.value.uuid) {
                return acc;
            }

            acc.push({
                label: x.value.description ||
                    `${this._translateService.instant('PAGE.RECYCLING-PROCESSES.RECYCLING-STEP', { key: key + 1 })}`,
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

        if (this._recyclingProcessId !== 'new') {
            promise = this._processActions.update(toSave).toPromise();
        } else {
            promise = this._processActions.create(toSave).toPromise();
        }

        promise
            .then((response) => {
                this._toastrService.success(
                    ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.SUCCESS.DESCRIPTION') as string,
                    ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.SUCCESS.TITLE') as string
                );

                this._router.navigate([`../${response._id}`], { relativeTo: this._route });
            })
            .catch(() => {
                this._toastrService.error(
                    ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.ERROR.DESCRIPTION') as string,
                    ngxExtract('TOAST.RECYCLING-PROCESS-SAVE.ERROR.TITLE') as string
                );
            });
    }

    public remove() {
        if (this._recyclingProcessId === 'new') {
            return;
        }

        this._processActions.delete(this.process._id)
            .toPromise()
            .then((response) => {
                this._toastrService.success(
                    ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.SUCCESS.DESCRIPTION') as string,
                    ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.SUCCESS.TITLE') as string
                );

                this._router.navigate(['../'], { relativeTo: this._route });
            })
            .catch(() => {
                this._toastrService.error(
                    ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.ERROR.DESCRIPTION') as string,
                    ngxExtract('TOAST.RECYCLING-PROCESS-REMOVE.ERROR.TITLE') as string
                );
            });
    }

    private _setupForm(process?: any): void {
        this.recyclingProcessForm = this._formBuilder.group({
            name: [pathOr('', ['data', 'name'])(process), Validators.required],
            steps: this._createStepFormGroups(pathOr([], ['data', 'steps'])(process))
        });
    }

    private _createStepFormGroups(steps: any[]): FormArray {
        if (!steps.length) {
            return this._formBuilder.array([this._createStep()]);
        }

        return this._formBuilder.array(steps.map((step) => this._createStep(step)));
    }

    private _createStep(step = {
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
        return this._formBuilder.group({
            uuid: [step.uuid],
            precedingStep: [step.precedingStep],
            description: [step.description, Validators.required],
            site: [step.site, Validators.required],
            methodOfProcessing: [step.methodOfProcessing, Validators.required],
            qualitativeDescription: this._formBuilder.group({
                text: [step.qualitativeDescription.text, Validators.required],
                asset: [step.qualitativeDescription.asset]
            }),
            schematicOverview: [step.schematicOverview],
        });
    }

    private _fetchProcessIfNeeded(): void {
        if (!this._recyclingProcessId || (this.process && prop('_id', this.process) === this._recyclingProcessId)) {
            return;
        }

        if (this._processSubscription) {
            this._processSubscription.unsubscribe();
        }

        if (this._recyclingProcessId === 'new') {
            return this._setupForm();
        }

        this._processActions.fetch(this._recyclingProcessId).toPromise();
        this._processSubscription = this.$process
            .pipe(takeUntil(this._componentDestroyed$))
            .pipe(filter((process) => !equals(process, this.process)))
            .subscribe((process) => {
                if (!process) {
                    return;
                }

                this.process = process;

                this._setupForm(this.process);
            });
    }

    ngOnDestroy() {
        this._componentDestroyed$.next(true);
        this._componentDestroyed$.complete();
    }
}



