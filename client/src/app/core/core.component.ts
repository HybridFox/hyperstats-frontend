import { Component, OnInit } from '@angular/core';
import { LanguageService } from './services';
import { AuthActions } from '@store/auth';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
})
export class CoreComponent implements OnInit {
  title = 'rare';

  constructor(
    private languageService: LanguageService,
    private authActions: AuthActions
  ) {}

  public ngOnInit() {
    this.languageService.initLanguage();
  }
}
