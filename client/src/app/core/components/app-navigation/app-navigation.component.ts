import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ActionButton } from './types';
import { select } from '@angular-redux/store';
import { storeRouterSelectors } from '@core/store-router';

import { CompanyType } from '@api/company';
import { UserInterface } from '@store/auth/auth.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
})
export class AppNavigationComponent implements OnInit {
  @select(storeRouterSelectors.data) public routeData$: any;
  @Input() public actionButton: ActionButton;
  @Input() public user: UserInterface;
  @Output() public logout: EventEmitter<void> = new EventEmitter<void>();

  public showAddReport = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.showAddReport = !this.user.isAdmin &&
      this.user.company.meta.type !== CompanyType.CO
      && this.user.company.meta.type === CompanyType.AO;
  }

  public onLogout() {
    this.logout.emit();
  }
}
