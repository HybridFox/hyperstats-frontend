import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-core-navigation',
    templateUrl: './core-navigation.component.html',
})
export class CoreNavigationComponent {
    @Input() public user: any;
}
