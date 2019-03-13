import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-multiple-file-upload',
    templateUrl: './multiple-file-upload.component.html',
})
export class MultipleFileUploadComponent implements OnChanges, OnDestroy {
    @Input() public response: any;
    @Input() public label?: string;
    @Input() public control: FormControl;
    @Input() public multiple: boolean;
    @Output() public upload: EventEmitter<FileList> = new EventEmitter<FileList>();
    @Output() public removeFile: EventEmitter<Number> = new EventEmitter<Number>();

    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public updateValue = (_: any) => {};

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.response && this.response) {
          const files = [];
          if (this.response.length === 0) {
            if (this.control) {
              this.control.patchValue([]);
            }
          } else {
            this.response.map((object, index) => {
              object.file
                .pipe(takeUntil(this.componentDestroyed$))
                .subscribe(res => {
                  if (res && res.result) {
                    files[index] = res.result;
                    if (this.control) {
                      this.control.patchValue(files);
                    }
                  }
              });
            });
          }
        }
    }

    public ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
    }

    public onSelect(fileList: FileList) {
        this.upload.emit(fileList);
    }

    public onRemoveFile(index) {
      this.removeFile.emit(index);
    }
}
