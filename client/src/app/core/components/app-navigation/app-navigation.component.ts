import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionButton } from './types';
import { select } from '@angular-redux/store';
import { storeRouterSelectors } from '@core/store-router';

@Component({
    selector: 'app-navigation',
    templateUrl: './app-navigation.component.html',
})
export class AppNavigationComponent {
    @select(storeRouterSelectors.data) public routeData$: any;
    @Input() public actionButton: ActionButton;
    @Input() public user: any;
    @Output() public logout: EventEmitter<any> = new EventEmitter<any>();

    public onLogout() {
        this.logout.emit();
    }
}
