import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { AuthActions } from '@store/auth';
import { LanguageService } from '../../services/language';
import { CoreComponent } from './core.component';

class MockLanguageService {
  initLanguage() {}
}

class MockAuthActions {
  public fetchProfile() {
    return of();
  }
}

describe('CoreComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        NgReduxTestingModule,
        RouterTestingModule,
      ],
      declarations: [
        CoreComponent,
      ],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: AuthActions, useClass: MockAuthActions }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();

    spyOn((TestBed.get(LanguageService) as any), 'initLanguage').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initLanguage onInit', () => {
    component.ngOnInit();
    expect((TestBed.get(LanguageService) as any).initLanguage).toHaveBeenCalled();
  });
});
