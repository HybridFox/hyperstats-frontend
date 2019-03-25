import { Component, OnInit } from '@angular/core';
import { AuditTrailSelectors, AuditTrailActions } from '../../store';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './audit-trail.page.html',
})
export class AuditTrailPageComponent implements OnInit {
  @select(AuditTrailSelectors.list.result) public logs$: Observable<any>;

  constructor(
    private auditTrailActions: AuditTrailActions,
  ) { }

  ngOnInit() {
    this.auditTrailActions.fetchAll().toPromise();
  }

}
