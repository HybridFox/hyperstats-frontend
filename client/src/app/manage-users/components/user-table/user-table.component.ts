import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
})
export class UserTableComponent {
    @Input() public users: any[];
}
