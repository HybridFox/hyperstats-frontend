import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { SelectInputComponent } from './select.component';

describe('SelectInputComponent', () => {
  let fixture: ComponentFixture<SelectInputComponent>;
  let component: SelectInputComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [SelectInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInputComponent);
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

    it('Should render a description when it is set', () => {
      component.description = 'description';
      fixture.detectChanges();

      const description = fixture.nativeElement.querySelector('.a-input__description');
      expect(description.textContent).toEqual('description');
    });

    it('Should render options', () => {
      component.options = [
        {
          value: 'test-value-1',
          label: 'test-label-1'
        },
        {
          value: 'test-value-2',
          label: 'test-label-2'
        },
        {
          value: 'test-value-3',
          label: 'test-label-3'
        },
      ];
      fixture.detectChanges();

      const options = fixture.nativeElement.querySelectorAll('.a-input__field option');
      expect(options.length).toEqual(4); // 3 + the default option
      expect(options[0].value).toEqual('test-value-1');
      expect(options[0].textContent).toEqual('test-label-1');
      expect(options[1].value).toEqual('test-value-2');
      expect(options[1].textContent).toEqual('test-label-2');
      expect(options[2].value).toEqual('test-value-3');
      expect(options[2].textContent).toEqual('test-label-3');
    });
  });
});
