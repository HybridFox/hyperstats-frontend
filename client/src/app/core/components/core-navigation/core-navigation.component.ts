import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-core-navigation',
    templateUrl: './core-navigation.component.html',
})
export class CoreNavigationComponent {
    @Input() public user: any;
    @Output() public logout: EventEmitter<any> = new EventEmitter();

    public onLogout() {
        this.logout.emit();
    }
}
