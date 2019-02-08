import { Component } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './wrapper.page.html',
})
export class WrapperPageComponent {
  @select(['auth', 'user', 'result']) public user$: Observable<any>;
}
