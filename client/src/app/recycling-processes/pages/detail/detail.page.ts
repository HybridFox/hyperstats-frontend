import { Component, OnInit, OnDestroy, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { select, select$ } from '@angular-redux/store';
import { prop, pathOr, equals } from 'ramda';
import { Observable, Subscription, Subject, of } from 'rxjs';
import { filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { RecyclingProcessesActions, RecyclingProcessesSelectors } from '../../store';
import { METHODS_OF_PROCESSING } from 'src/lib/constants';
import { RecyclingPartnerActions, RecyclingPartnerSelector } from 'src/app/recycling-partners/store';
import { FormHelper } from '@helpers/form.helper';
import { companiesToSelectOptions } from '@helpers/select.helpers';
import { AssetsRepository } from '@api/assets';

@Component({
  templateUrl: './detail.page.html',
})
export class DetailPageComponent implements OnInit, OnDestroy {
    @select(RecyclingProcessesSelectors.detail.result) public $process: Observable<any>;
    @select$(RecyclingPartnerSelector.list.result, companiesToSelectOptions) public partners$: Observable<any[]>;

    public recyclingProcessForm: any;
    public process: any;
    public methodsOfProcessing: any[] = METHODS_OF_PROCESSING;
    public recyclingProcessId: string;
    public duplicateProcessId: string;
    public uploadResponse: any;
    public uploadResults;

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
        this.uploadResults = null;
        if (!this.recyclingProcessId || (this.process && prop('_id', this.process) === this.recyclingProcessId)) {
            return;
        }

        if (this.processSubscription) {
            this.processSubscription.unsubscribe();
        }

        const duplicate = (this.process && prop('_id', this.process) === this.duplicateProcessId);
        let id = this.recyclingProcessId;

        if (this.recyclingProcessId === 'new' && !duplicate) {
            this.process = null;
            return this.process;
        }

        if (this.recyclingProcessId === 'new' && duplicate) {
            id = this.duplicateProcessId;
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

    public onUpload(fileObject) {
        this.uploadResults = Object.assign({}, this.uploadResults, {
            [fileObject.stepIndex]: Object.assign({}, this.uploadResults ? this.uploadResults[fileObject.stepIndex] : {}, {
                [fileObject.input]: this.assetsRepository.upload(fileObject.fileList[0])
            })
        });
    }

    public onRemoveFile(fileObject) {
      const emptyObject = of({
        progress: '',
        result: {
          id: '',
          mimetype: '',
          uploadDate: '',
          originalname: '',
        },
        originalname: '',
      });
      this.uploadResults = Object.assign({}, this.uploadResults, {
        [fileObject.stepIndex]: Object.assign({}, this.uploadResults ? this.uploadResults[fileObject.stepIndex] : {}, {
            [fileObject.input]: emptyObject,
        })
      });
    }
}
