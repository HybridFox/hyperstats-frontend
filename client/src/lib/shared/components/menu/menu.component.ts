import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionButton } from './menu.types';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
})

export class MenuComponent {
    @Input() actionButton: ActionButton;
    @Input() profile: any;
    @Output() logout: EventEmitter<any> = new EventEmitter<any>();
}
