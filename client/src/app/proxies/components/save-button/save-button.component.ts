import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-proxies-save-button',
  templateUrl: './save-button.component.html',
})

export class SaveButtonComponent {
  @Input() public disabled: boolean;
  @Output() public saveFunction: EventEmitter<any> = new EventEmitter();

  public popupOpen: boolean;

  public openPopup() {
    this.popupOpen = true;
  }

  public confirmSave() {
    this.saveFunction.emit();
    this.popupOpen = false;
  }

  public cancelSave() {
    this.popupOpen = false;
  }
}
