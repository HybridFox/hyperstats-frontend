import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-section-title',
  templateUrl: './sub-section-title.component.html',
})
export class SubSectionTitleComponent {
  @Input() title: string;
}
