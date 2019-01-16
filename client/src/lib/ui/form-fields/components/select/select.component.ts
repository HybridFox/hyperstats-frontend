import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Option } from './select.types';
@Component({
  selector: 'app-select-input',
  templateUrl: './select.component.html',
})
export class SelectInputComponent {
  @Input() label?: string;
  @Input() class?: string;
  @Input() description?: string;
  @Input() options: Option[];
  @Input() control: FormControl = new FormControl('');

  trackOption(index, option) {
    return option ? option.value : undefined;
  }
}
