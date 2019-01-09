import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from './services/language';
import { CoreComponent } from './core.component';
import { FooterComponent } from '@ui/footer/footer.component';
import { MainMenuComponent } from '@ui/main-menu/main-menu.component';
import { UserMenuComponent } from '@ui/user-menu/user-menu.component';
import { MenuComponent } from '@ui/menu/menu.component';
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { AuthActions } from '@store/auth';

class MockNgRedux {
  select(selector) {
    return {};
  }
}

class MockLanguageService {
  initLanguage() {}
}

class MockAuthActions {

}

describe('CoreComponent', () => {
  let component: CoreComponent;
  let fixture: ComponentFixture<CoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        NgReduxTestingModule,
        RouterTestingModule
      ],
      declarations: [
        CoreComponent,
        FooterComponent,
        MainMenuComponent,
        UserMenuComponent,
        MenuComponent,
      ],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: AuthActions, useClass: MockAuthActions }
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
