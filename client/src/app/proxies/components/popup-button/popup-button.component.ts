import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-proxies-popup-button',
  templateUrl: './popup-button.component.html',
})

export class PopupButtonComponent {
  @Input() public disabled: boolean;
  @Input() public buttonText: string;
  @Input() public buttonClass: string;
  @Input() public popupTitle: string;
  @Input() public popupExplanation: string;
  @Input() public confirmLabel: string;
  @Input() public cancelLabel: string;
  @Output() public actionFunction: EventEmitter<any> = new EventEmitter();

  public popupOpen: boolean;

  public openPopup() {
    this.popupOpen = true;
  }

  public confirmAction() {
    this.actionFunction.emit();
    this.popupOpen = false;
  }

  public cancelAction() {
    this.popupOpen = false;
  }
}
