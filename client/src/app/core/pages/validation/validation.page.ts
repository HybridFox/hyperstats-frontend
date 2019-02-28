import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

@Component({
    templateUrl: './validation.page.html',
})
export class ValidationPageComponent {
  @select(['auth', 'user', 'result']) private user$: Observable<any>;
}
