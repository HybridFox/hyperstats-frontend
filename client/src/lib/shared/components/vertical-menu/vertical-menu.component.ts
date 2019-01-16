import { Component, Input } from '@angular/core';
import { MenuItem } from './vertical-menu.types';

@Component({
    selector: 'app-vertical-menu',
    templateUrl: './vertical-menu.component.html',
})

export class VerticalMenuComponent {
    @Input() menuItems: MenuItem[];
}
