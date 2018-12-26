import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
  constructor(
    private translate: TranslateService,
  ) {}

  public initLanguage() {
    // this language will be used  as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
  }

  public changeLanguage(lang: any) {
    this.translate.use(lang);
  }
}
