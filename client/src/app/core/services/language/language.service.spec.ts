import { TestBed, inject } from '@angular/core/testing';
import { LanguageService } from './language.service';
import { TranslateService } from '@ngx-translate/core';

class MockTranslateService {
  setDefaultLang(lang) { }
  use(lang) { }
}

describe('LanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        { provide: TranslateService, useClass: MockTranslateService },
      ],
    });

    spyOn((TestBed.get(TranslateService) as any), 'setDefaultLang').and.callThrough();
    spyOn((TestBed.get(TranslateService) as any), 'use').and.callThrough();
  });

  it('should be created', inject([LanguageService], (service: LanguageService) => {
    expect(service).toBeTruthy();
  }));

  it('should initiate lang', inject([LanguageService], (service: LanguageService) => {
    service.initLanguage();
    expect((TestBed.get(TranslateService) as any).setDefaultLang).toHaveBeenCalledWith('en');
  }));

  it('should set lang', inject([LanguageService], (service: LanguageService) => {
    const language = 'nl';

    service.changeLanguage(language);
    expect((TestBed.get(TranslateService) as any).use).toHaveBeenCalledWith(language);
  }));
});
