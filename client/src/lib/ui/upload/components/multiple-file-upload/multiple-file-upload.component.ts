import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import isNil from 'ramda/es/isNil';
import { UPLOAD_CONSTS } from './multiple-file-upload.const';

@Component({
    selector: 'app-multiple-file-upload',
    templateUrl: './multiple-file-upload.component.html',
})
export class MultipleFileUploadComponent implements OnChanges, OnDestroy {
    @Input() public response: any;
    @Input() public storedFiles: any;
    @Input() public label?: string;
    @Input() public control: FormControl;
    @Input() public multiple: boolean;
    @Output() public upload: EventEmitter<FileList> = new EventEmitter<FileList>();
    @Output() public removeFile: EventEmitter<Object> = new EventEmitter<Object>();

    public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();
    public uploadTypes = UPLOAD_CONSTS;
    public updateValue = (_: any) => {};

    public ngOnChanges(changes: SimpleChanges) {
        console.log(this.response);
        if (changes.response && !isNil(this.response)) {
          const files = this.storedFiles ? this.storedFiles.concat(this.response) : this.response;
          this.patchFiles(files);
        }
        if (changes.storedFiles && !isNil(this.storedFiles)) {
          const files = this.response ? this.storedFiles.concat(this.response) : this.storedFiles;
          this.patchFiles(files);
        }
    }

    public ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
    }

    public onSelect(fileList: FileList) {
        this.upload.emit(fileList);
    }

    public onRemoveFile(index, type) {
      this.removeFile.emit({index: index, type: type});
    }

    private patchFiles(files) {
      if (this.control) {
        this.control.patchValue(
          files.map(file => {
            if (file) {
              return file.result;
            }
          })
        );
      }
    }
}
