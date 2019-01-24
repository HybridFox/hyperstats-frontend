import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
})
export class UserMenuComponent {
    @Input() profile: any;
    @Output() logout: EventEmitter<any> = new EventEmitter<any>();

    public visible = false;

    @HostListener('document:click', ['$event']) clickout(event) {
        if (this.visible) {
            this.close();
        }
    }

    public close() {
        this.visible = false;
    }

    public toggle() {
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
