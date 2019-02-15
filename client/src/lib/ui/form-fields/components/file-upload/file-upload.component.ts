import { Component, Input, Output, OnDestroy, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, ControlValueAccessor, FormBuilder } from '@angular/forms';
import { createFileUploadControl } from './file-upload.helper';
import { AssetsRepository } from '@api/assets';
import { timingSafeEqual } from 'crypto';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
})

export class FileUploadComponent implements OnDestroy, OnInit, ControlValueAccessor {
    @Input() title?: string;
    @Input() description?: string;
    @Input() details?: string;
    @Input() label?: string;
    @Input() class = '';
    @Input() multiple: boolean;

    public uploadFile: boolean;
    public formGroup: FormGroup;
    public uploadProcess: string;

    private patching = false;

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private assetsRepository: AssetsRepository
    ) {}

    public ngOnInit() {
        this.formGroup = createFileUploadControl();
        this.formGroup.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((value) => {
                if (this.patching) {
                    return this.patching = false;
                }

                this.propagateChange(value);
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public onUpload(event) {
        if (event.target.files.length > 0) {
            const formData: FormData = new FormData();
            formData.append('file', event.target.files[0]);
            this.showFile(event);
            this.assetsRepository
                .upload(formData)
                .subscribe(fileResponse => {
                    if (fileResponse && fileResponse.constructor === Number) {
                        this.uploadProcess = fileResponse;
                    } else if (fileResponse) {
                        this.formGroup.patchValue(fileResponse);
                    }
                });
        }
    }

    public showFile(event) {
        this.uploadFile = true;
    }

    public propagateChange = (_: any) => {};

    public writeValue(value: any): void {
        this.patching = true;
        this.formGroup.patchValue(value);
    }

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

}
