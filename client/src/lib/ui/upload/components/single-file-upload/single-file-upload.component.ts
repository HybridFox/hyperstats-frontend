import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-single-file-upload',
    templateUrl: './single-file-upload.component.html',
})
export class SingleFileUploadComponent implements OnChanges {
    @Input() public response: any;
    @Input() public label?: string;
    @Input() public control: FormControl;
    @Input() public storedFile: string;
    @Input() public multiple: boolean;
    @Output() public upload: EventEmitter<FileList> = new EventEmitter<FileList>();

    public updateValue = (_: any) => {};

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.response) {
            if (this.response && this.response.result) {
              if (this.control) {
                this.control.patchValue({
                  ...this.response.result,
                });
              }
            }
        }
    }

    public onSelect(fileList: FileList) {
        this.upload.emit(fileList);
    }
}
