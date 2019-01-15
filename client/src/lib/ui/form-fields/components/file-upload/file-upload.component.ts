import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
})

export class FileUploadComponent implements OnInit, OnDestroy {
    @Input() title?: string;
    @Input() description ?: string;
    @Input() details?: string;
    @Input() label ?: string;
    @Input() control: FormControl = new FormControl('');

    private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

    public updateValue = (_: any) => {};

    public ngOnInit() {
        this.control.valueChanges.pipe(
            takeUntil(this.componentDestroyed$),
        ).subscribe((value) => {
            this.updateValue(value);
        });
    }

    public ngOnDestroy() {
        this.componentDestroyed$.next(true);
        this.componentDestroyed$.complete();
    }
}
