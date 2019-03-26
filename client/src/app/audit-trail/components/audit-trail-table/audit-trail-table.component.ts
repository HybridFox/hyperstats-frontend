import { Component, Input } from '@angular/core';
import { Log } from '@api/audit-trail/audit-trail.types';

@Component({
  selector: 'app-audit-trail-table',
  templateUrl: './audit-trail-table.component.html',
})

export class AuditTrailTableComponent {
  @Input() public logs: Log;
}
