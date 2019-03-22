import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
})

export class DeleteButtonComponent {
  @Input() public disabled = false;
  @Input() public extraMessage = 0;
  @Output() public deleteFunction: EventEmitter<any> = new EventEmitter();

  public popupOpen: boolean;

  public openPopup() {
    this.popupOpen = true;
  }

  public confirmDelete() {
    this.deleteFunction.emit();
  }

  public cancelDelete() {
    this.popupOpen = false;
  }
}
