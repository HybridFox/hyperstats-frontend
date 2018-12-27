import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language';
import { Subject } from 'rxjs';


import { CoreComponent } from './core.component';

class MockLanguageService {

}

describe('CoreComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreComponent ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(CoreComponent);
    expect(fixture).not.toBeNull();
  }));
});
