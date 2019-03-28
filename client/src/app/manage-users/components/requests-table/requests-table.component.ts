import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup-requests-table',
  templateUrl: './requests-table.component.html',
})
export class SignupRequestsTableComponent {
  @Input() public requests: any[];
}
