import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

@Component({
    templateUrl: './validation.page.html',
})
export class ValidationPageComponent implements OnInit {
  @select(['auth', 'user', 'result']) private user$: Observable<any>;

  public type: String;

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        switch (user.status.type) {
          case 'DEACTIVATED':
            this.type = 'DEACTIVATED';
        }
      }
    });
  }
}
