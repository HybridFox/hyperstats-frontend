import { Component, Output, EventEmitter, OnDestroy, OnChanges, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-upload-preview',
    templateUrl: './upload-preview.component.html',
})
export class UploadPreviewComponent implements OnDestroy, OnChanges {
    @Input() public upload: any;
    @Input() public uploadResult: any;
    @Input() public uploadProgress: any;

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    public ngOnChanges() {
        // console.log(this.upload);
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
