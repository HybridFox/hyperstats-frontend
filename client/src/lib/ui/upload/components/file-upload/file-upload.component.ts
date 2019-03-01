import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { registerContentQuery } from '@angular/core/src/render3';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
})
export class FileUploadComponent implements OnChanges {
    @Input() public response: any;
    @Input() public label?: string;
    @Input() public control: FormControl;
    @Input() public storedFile: string;
    @Input() public multiple: boolean;
    @Output() public upload: EventEmitter<FileList> = new EventEmitter<FileList>();
    @Output() public removeFile: EventEmitter<boolean> = new EventEmitter<boolean>();

    public files: any[];

    public updateValue = (_: any) => {};

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.response) {
          if (this.response) {
            console.log(this.response);
          }
            // if (this.response) {
            //   this.response.map((file, index) => {
            //     file.subscribe(res => {
            //       this.files[index] = {
            //         ...res,
            //       };
            //       console.log(this.files[index]);
            //     });
            //   });
            //   if (this.control) {
            //     this.control.patchValue({
            //       ...this.response.result,
            //     });
            //   }
            // }
        }
    }

    public onSelect(fileList: FileList) {
        this.upload.emit(fileList);
    }

    public onRemoveFile() {
      this.removeFile.emit();
  }
}
