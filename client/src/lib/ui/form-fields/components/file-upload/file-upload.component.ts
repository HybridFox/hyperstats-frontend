import { Component, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
})

export class FileUploadComponent implements OnDestroy {
    @Input() title?: string;
    @Input() description?: string;
    @Input() details?: string;
    @Input() label?: string;
    @Input() class = '';
    @Input() multiple: boolean;
    @Output() upload = new EventEmitter<any>();

    constructor(private http: HttpClient) { }

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    public updateValue = (_: any) => {};

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public onUpload(event) {
        if (event.target.files.length > 0) {
            const formData: FormData = new FormData();
            formData.append('file', event.target.files[0]);
            this.upload.emit(formData);
        }
    }

}
