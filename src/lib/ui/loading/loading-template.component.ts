import { Component, Input, OnChanges } from '@angular/core';

import { LoadingHandler } from './loading-handler.class';
import { LOADING_MESSAGES } from './loading.messages';
import { LoadingType } from './loading.types';

@Component({
  selector: 'app-loading-template',
  templateUrl: './loading-template.component.html',
  styleUrls: ['loading-template.component.scss'],
})
export class LoadingTemplateComponent implements OnChanges {
  @Input() public loading;
  @Input() public type: LoadingType;

  public STATUS = LoadingHandler.STATUS;
  public messages = null;

  public ngOnChanges() {
    this.messages = LOADING_MESSAGES[this.type] || LOADING_MESSAGES.fetch;
  }
}
