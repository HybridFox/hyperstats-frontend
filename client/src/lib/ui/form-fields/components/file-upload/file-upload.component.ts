import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';

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
    @Input() uploadResult: any;
    @Input() uploadProgress: any;

    @Output() public upload: EventEmitter<FormData> = new EventEmitter<FormData>();

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    public file: any;

    public ngOnInit() {

    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public onUpload(event) {
        const formData: FormData = new FormData();
        this.file = {
            name: event.target.files[0].name,
        };
        formData.append('file', event.target.files[0]);

        this.upload.emit(formData);
    }

    // public getFile() {
    //     this.fileUrl = this.assetsRepository.getFileURL(this.control.value.id);
    // }
}
