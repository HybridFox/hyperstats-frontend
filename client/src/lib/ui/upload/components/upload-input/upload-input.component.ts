import { Component, Output, EventEmitter, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-upload-input',
    templateUrl: './upload-input.component.html',
})
export class UploadInputComponent implements OnDestroy, OnInit {
    @Input() label?: string;
    @Input() multiple: boolean;
    @Output() public select: EventEmitter<FileList> = new EventEmitter<FileList>();

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    public ngOnInit() {
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }

    public onSelect(event) {
        this.select.emit(event.target.files);
    }
}
