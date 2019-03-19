import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-recyclers-table',
    templateUrl: './recyclers-table.component.html',
})
export class RecyclersTableComponent {
    @Input() public recyclers: any[];
}
