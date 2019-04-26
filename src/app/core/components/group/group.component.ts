import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
})
export class GroupComponent {
  @Input() group: any;

  public open = false;

  constructor() { }

  toggleOpen = () => {
    this.open = !this.open;
  }
}
