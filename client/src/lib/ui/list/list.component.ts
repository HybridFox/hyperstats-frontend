import { Component, Input } from '@angular/core';
import { ListItem } from './list.types';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
})

export class ListComponent {
    @Input() listItems: ListItem[];
}
