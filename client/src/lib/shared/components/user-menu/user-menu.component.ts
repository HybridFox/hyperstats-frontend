import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { STATUS_TYPES } from 'src/lib/constants';

import { UserInterface } from '@store/auth/auth.interface';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
})
export class UserMenuComponent {
    @Input() profile: UserInterface;
    @Output() logout: EventEmitter<any> = new EventEmitter<any>();

    public visible = false;
    public statusTypes = STATUS_TYPES;

    @HostListener('document:click', ['$event']) clickout() {
        if (this.visible) {
            this.close();
        }
    }

    public close() {
        this.visible = false;
    }

    public toggle(event) {
        event.stopPropagation();
        this.visible = !this.visible;
    }

    public logoff() {
        this.logout.emit();
    }

    public preventClick(event) {
        event.stopPropagation();
    }
}
