import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-uploaded-list',
    templateUrl: './uploaded-list.component.html',
})
export class UploadedListComponent {
    @Input() public storedFile: string;
    @Output() public removeFile: EventEmitter<void> = new EventEmitter<void>();

    public onRemoveFile() {
      this.removeFile.emit();
    }
}
