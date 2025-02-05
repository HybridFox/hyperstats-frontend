import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-upload-preview',
    templateUrl: './upload-preview.component.html',
})
export class UploadPreviewComponent {
    @Input() public name: string;
    @Input() public progress: number;
    @Input() public storedFile: string;
    @Output() public removeFile: EventEmitter<void> = new EventEmitter<void>();

    public onRemoveFile() {
      this.removeFile.emit();
  }
}
