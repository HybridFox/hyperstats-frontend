import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-audit-trail-table',
  templateUrl: './audit-trail-table.component.html',
})

export class AuditTrailTableComponent {
  @Input() public logs: any;
}
