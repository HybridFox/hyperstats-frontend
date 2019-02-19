import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { MassInputComponent } from './mass-input.component';

describe('TextInputComponent', () => {
  let fixture: ComponentFixture<MassInputComponent>;
  let component: MassInputComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [MassInputComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MassInputComponent);
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
    it('Should render a placeholder when it is set', () => {
      component.placeholder = 'Test';
      fixture.detectChanges();

      const inputElement = fixture.nativeElement.querySelector('.a-input__field');
      expect(inputElement.placeholder).toEqual('Test');
    });

    it('Should render a label when it is set', () => {
      component.label = 'Test';
      fixture.detectChanges();

      const label = fixture.nativeElement.querySelector('.a-input__label');
      expect(label.textContent).toEqual('Test');
    });

    it('Should render a suffix when it is set', () => {
      component.suffix = 'Test';
      fixture.detectChanges();

      const suffix = fixture.nativeElement.querySelector('.a-input__suffix');
      expect(suffix.textContent).toEqual('Test');
    });

    it('Should render a description when it is set', () => {
      component.description = 'description';
      fixture.detectChanges();

      const description = fixture.nativeElement.querySelector('.a-input__description');
      expect(description.textContent).toEqual('description');
    });
  });
});
