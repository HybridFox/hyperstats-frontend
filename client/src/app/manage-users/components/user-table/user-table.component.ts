import { Component, Input } from '@angular/core';
import { UserInterface } from '@store/auth/auth.interface';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
})
export class UserTableComponent {
  @Input() public users: UserInterface[];
}
