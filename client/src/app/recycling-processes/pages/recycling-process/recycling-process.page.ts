import { Component, OnInit, OnDestroy, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { select, select$ } from '@angular-redux/store';
import { prop, pathOr, equals } from 'ramda';
import { Observable, Subscription, Subject } from 'rxjs';
import { filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RecyclingProcessesActions, RecyclingProcessesSelectors } from '../../store';
import { METHODS_OF_PROCESSING } from 'src/lib/constants';
import { RecyclingPartnerActions, RecyclingPartnerSelector } from 'src/app/recycling-partners/store';
import { recyclingPartnersToSelectOptions } from './select.helpers';
import { AssetsRepository } from '@api/assets';
import { FormHelper } from '@helpers/form.helper';

@Component({
  templateUrl: './recycling-process.page.html',
})
export class RecyclingProcessPageComponent implements OnInit, OnDestroy {
    @select(RecyclingProcessesSelectors.detail.result) public $process: Observable<any>;
    @select$(RecyclingPartnerSelector.list.result, recyclingPartnersToSelectOptions) public partnerOptions$: Observable<any[]>;

    public recyclingProcessForm: any;
    public process: any;
    public methodsOfProcessing: any[] = METHODS_OF_PROCESSING;
    public recyclingProcessId: string;
    public duplicateProcessId: string;

    private processSubscription: Subscription;
    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private processActions: RecyclingProcessesActions,
        private partnerActions: RecyclingPartnerActions,
        private route: ActivatedRoute,
        private router: Router,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        private assetsRepository: AssetsRepository
    ) {}

    public ngOnInit() {
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

    public duplicateProcess(event) {
        this.duplicateProcessId = event;
        this.router.navigate(['../new'], { relativeTo: this.route });
    }

    public save(recyclingProcessForm: any) {
        FormHelper.markAsDirty(recyclingProcessForm);

        if (recyclingProcessForm.invalid) {
            return;
        }

        const rawValue = recyclingProcessForm.getRawValue();

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

    public toggleActivation(event) {
        console.log(event);
        const isCurrentlyActive = pathOr(false, ['meta', 'activated'])(this.process);
        const type = this.translateService.instant(
            isCurrentlyActive ?
            ngxExtract('TOAST.RECYCLING-PROCESS-TOGGLE.DEACTIVATED') :
            ngxExtract('TOAST.RECYCLING-PROCESS-TOGGLE.ACTIVATED')
        );


        const promise: Promise<any> = isCurrentlyActive ?
            this.processActions.deactivate(this.recyclingProcessId).toPromise() :
            this.processActions.activate(this.recyclingProcessId).toPromise();

        promise
            .then(() => {
                this.toastrService.success(
                    this.translateService.instant('TOAST.RECYCLING-PROCESS-TOGGLE.SUCCESS.DESCRIPTION', { type }) as string,
                    this.translateService.instant('TOAST.RECYCLING-PROCESS-TOGGLE.SUCCESS.TITLE', { type }) as string
                );
            })
            .catch(() => {
                this.toastrService.error(
                    this.translateService.instant('TOAST.RECYCLING-PROCESS-TOGGLE.ERROR.DESCRIPTION', { type }) as string,
                    this.translateService.instant('TOAST.RECYCLING-PROCESS-TOGGLE.ERROR.TITLE', { type }) as string
                );
            });
    }

    private fetchProcessIfNeeded(): void {
        if (!this.recyclingProcessId || (this.process && prop('_id', this.process) === this.recyclingProcessId)) {
            return;
        }

        if (this.processSubscription) {
            this.processSubscription.unsubscribe();
        }

        let id;
        if (this.recyclingProcessId === 'new' && (this.process && prop('_id', this.process) === this.duplicateProcessId)) {
            id = this.duplicateProcessId;
        } else if (this.recyclingProcessId === 'new') {
            this.process = null;
            return this.process;
        } else {
            id = this.recyclingProcessId;
        }
        this.processActions.fetchById(id).toPromise();
        this.processSubscription = this.$process
            .pipe(takeUntil(this.componentDestroyed$))
            .pipe(filter((process) => process && !equals(process, this.process)))
            .subscribe((process) => {
                this.process = process;
            });
        this.duplicateProcessId = null;
    }

    public uploadFile(file) {
        this.assetsRepository.upload(file).toPromise();
    }
}
