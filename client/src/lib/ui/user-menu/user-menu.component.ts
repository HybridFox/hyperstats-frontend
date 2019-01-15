import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
})

export class UserMenuComponent {
    @Input() profile: any;
    @Output() logout: EventEmitter<any> = new EventEmitter<any>();

    public visible = false;

    public toggle() {
        this.visible = !this.visible;
    }

    public logoff() {
        this.logout.emit();
    }
}
