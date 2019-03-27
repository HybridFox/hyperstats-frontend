import { Component, Input, Output, EventEmitter } from '@angular/core';
import { STATUS_TYPES } from 'src/lib/constants';

import { UserInterface } from '@store/auth/auth.interface';

@Component({
    selector: 'app-core-navigation',
    templateUrl: './core-navigation.component.html',
})
export class CoreNavigationComponent {
    @Input() public user: UserInterface;
    @Output() public logout: EventEmitter<void> = new EventEmitter<void>();

    public statusTypes = STATUS_TYPES;

    public onLogout() {
        this.logout.emit();
    }
}
