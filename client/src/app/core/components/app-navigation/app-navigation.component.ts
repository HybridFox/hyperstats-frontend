import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActionButton } from './types';
import { select } from '@angular-redux/store';
import { storeRouterSelectors } from '@core/store-router';

@Component({
    selector: 'app-navigation',
    templateUrl: './app-navigation.component.html',
})
export class AppNavigationComponent implements OnInit  {
    @select(storeRouterSelectors.data) public routeData$: any;
    @Input() public actionButton: ActionButton;
    @Input() public user: any;
    @Output() public logout: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router) { }

    ngOnInit() {
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0);
      });
  }

    public onLogout() {
        this.logout.emit();
    }
}
