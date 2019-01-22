import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionButton } from './menu.types';
import { select } from '@angular-redux/store';
import { storeRouterSelectors } from '@core/store-router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
})

export class MenuComponent {
    @select(storeRouterSelectors.data) public routeData$: any;

    @Input() actionButton: ActionButton;
    @Input() profile: any;
    @Output() logout: EventEmitter<any> = new EventEmitter<any>();
}
