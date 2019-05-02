import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
})
export class GroupComponent {
  @Input() group: any;

  public open = false;

  constructor() { }

  trackByFn(index, item) {
    return item.id;
  }

  toggleOpen = () => {
    this.open = !this.open;
  }
}
