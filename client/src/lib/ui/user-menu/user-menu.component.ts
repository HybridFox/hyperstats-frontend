import { Component } from '@angular/core';

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
})

export class UserMenuComponent {
    public visible = false;

    public toggle() {
        this.visible = !this.visible;
    }
}
