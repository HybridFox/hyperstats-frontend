import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { UserInterface } from '@store/auth/auth.interface';

@Component({
  templateUrl: './audit-trail.page.html',
})
export class AuditTrailComponent {
  @select(['auth', 'user', 'result']) public user$: Observable<UserInterface>;

  logs = [
    {
      'activity': 'Khad Y. added Pilar G. to the Customer Support Group',
      'date': '2016/09/07 at 7:56 pm',
      'user': 'Khad Young'
    },
    {
      'activity': 'Mohamed O. gave the Recovery Group access to the vault',
      'date': '2016/09/07 at 7:55 pm',
      'user': 'Mohamed Osman'
    },
    {
      'activity': 'Khad Y. added Mohamed O. to the team Team Members Group',
      'date': '2016/09/07 at 7:55 pm',
      'user': 'Khad Young'
    }
  ];

}
