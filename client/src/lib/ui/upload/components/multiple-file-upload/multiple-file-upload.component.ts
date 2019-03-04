import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-multiple-file-upload',
    templateUrl: './multiple-file-upload.component.html',
})
export class MultipleFileUploadComponent implements OnChanges {
    @Input() public response: any;
    @Input() public label?: string;
    @Input() public control: FormControl;
    @Input() public multiple: boolean;
    @Output() public upload: EventEmitter<FileList> = new EventEmitter<FileList>();
    @Output() public removeFile: EventEmitter<Number> = new EventEmitter<Number>();

    public updateValue = (_: any) => {};

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.response && this.response) {
          const files = [];
          this.response.map((object, index) => {
            object.file.subscribe(res => {
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

    public onSelect(fileList: FileList) {
        this.upload.emit(fileList);
    }

    public onRemoveFile(index) {
      this.removeFile.emit(index);
    }
}
