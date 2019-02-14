import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
})

export class DeletePopupComponent {
  @Input() public title: string;
  @Output() public cancelDeleteItem: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public confirmDeleteItem: EventEmitter<boolean> = new EventEmitter<boolean>();

  public confirmClicked() {
    this.confirmDeleteItem.emit(true);
  }

  public cancelClicked() {
    this.cancelDeleteItem.emit(true);
  }
}
