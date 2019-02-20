import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

import { DeleteButtonComponent } from './delete-button.component';

describe('DeleteButtonComponent', () => {
  let fixture: ComponentFixture<DeleteButtonComponent>;
  let component: DeleteButtonComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [DeleteButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('Should call deleteFunction.emit when clicked on the button', async(() => {
    spyOn(component.deleteFunction, 'emit');

    component.popupOpen = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.a-button--confirmremove')).nativeElement;

    button.click();

    fixture.whenStable().then(() => {
      expect(component.deleteFunction.emit).toHaveBeenCalled();
    });
  }));
});
