import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
})
export class CoreComponent implements OnInit {
  title = 'rare';

  constructor(
    private languageService: LanguageService,
  ) {}

  public ngOnInit() {
    this.languageService.initLanguage();
  }
}
