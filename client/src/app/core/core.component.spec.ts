import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language';
import { CoreComponent } from './core.component';

class MockLanguageService {
  initLanguage() {}
}

describe('CoreComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      declarations: [ CoreComponent ],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
      ],
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
