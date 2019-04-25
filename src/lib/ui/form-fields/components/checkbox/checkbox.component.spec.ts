import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { CheckboxInputComponent } from './checkbox.component';

describe('CheckboxInputComponent', () => {
  let fixture: ComponentFixture<CheckboxInputComponent>;
  let component: CheckboxInputComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [CheckboxInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div'));
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('ControlValueAccessor interface', () => {
    describe('registerOnChange', () => {
      it('should register the onChange callback', () => {
        const dummyCallback = () => {};

        component.registerOnChange(dummyCallback);

        expect(component.updateValue).toEqual(dummyCallback);
      });
    });
  });

  describe('DOM', () => {
    it('Should render a label when it is set', () => {
      component.label = 'Test';
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.a-input__label');
      expect(label.textContent).toEqual('Test');
    });
  });
});
