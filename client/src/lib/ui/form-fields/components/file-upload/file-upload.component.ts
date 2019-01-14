import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
})

export class FileUploadComponent implements OnInit, OnDestroy {
    @Input() title?: string;
    @Input() description ?: string;
    @Input() details?: string;
    @Input() label ?: string;

    public ngOnInit() {}
    public ngOnDestroy() {}
}
