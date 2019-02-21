import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-upload-input',
    templateUrl: './upload-input.component.html',
})
export class UploadInputComponent implements OnDestroy, OnInit {
    @Output() public upload: EventEmitter<boolean> = new EventEmitter<boolean>();

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    public ngOnInit() {
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public onUpload(event) {
        if (event.target.files.length === 0) {
            return;
        }
        this.upload.emit(event);
    }
}
