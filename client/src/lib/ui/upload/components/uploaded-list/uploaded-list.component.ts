import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-uploaded-list',
    templateUrl: './uploaded-list.component.html',
})
export class UploadedListComponent {
    @Input() public storedFile: string;
}
