import { Component, Input, Output, EventEmitter } from '@angular/core';
import { STATUS_TYPES } from 'src/lib/constants';

@Component({
    selector: 'app-core-navigation',
    templateUrl: './core-navigation.component.html',
})
export class CoreNavigationComponent {
    @Input() public user: any;
    @Output() public logout: EventEmitter<any> = new EventEmitter();

    public statusTypes = STATUS_TYPES;

    public onLogout() {
        this.logout.emit();
    }
}
