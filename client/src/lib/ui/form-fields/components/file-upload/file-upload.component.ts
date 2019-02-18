import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { createFileUploadControl } from './file-upload.helper';
import { AssetsRepository } from '@api/assets';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
})

export class FileUploadComponent implements OnDestroy, OnInit {
    @Input() title?: string;
    @Input() description?: string;
    @Input() details?: string;
    @Input() label?: string;
    @Input() class = '';
    @Input() multiple: boolean;
    @Input() control: FormControl = new FormControl('');

    public formGroup: FormGroup;
    public uploadProcess: string;
    public fileUrl;

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private assetsRepository: AssetsRepository
    ) {}

    public ngOnInit() {
        this.formGroup = createFileUploadControl();
        this.formGroup.valueChanges
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((value) => {
                this.control.patchValue(value);
            });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public onUpload(event) {
        if (event.target.files.length === 0) {
            return;
        }

        const formData: FormData = new FormData();
        formData.append('file', event.target.files[0]);
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

    public getFile() {
        this.fileUrl = this.assetsRepository.getFileURL(this.control.value.id);
    }
}
