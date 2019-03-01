import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
    selector: 'app-upload-preview',
    templateUrl: './upload-preview.component.html',
})
export class UploadPreviewComponent implements OnInit {
    @Input() public name: string;
    @Input() public progress: any;
    @Input() public storedFile: string;
    @Output() public removeFile: EventEmitter<boolean> = new EventEmitter<boolean>();

    public ngOnInit() {
      console.log(this.progress);
    }

    public onRemoveFile() {
      this.removeFile.emit();
  }
}
