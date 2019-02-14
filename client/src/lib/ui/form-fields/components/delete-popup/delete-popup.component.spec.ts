import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

import { DeletePopupComponent } from './delete-popup.component';

describe('DeletePopupComponent', () => {
  let fixture: ComponentFixture<DeletePopupComponent>;
  let component: DeletePopupComponent;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [DeletePopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('div'));
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('Should render a title when it is set', () => {
    component.title = 'Test';
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('p');
    expect(title.textContent).toEqual('Test');
  });

  it('Should call cancelDeleteItem.emit when clicked on the button', async(() => {
    spyOn(component.cancelDeleteItem, 'emit');

    const button = fixture.debugElement.nativeElement.querySelector('.a-button--ghost');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.cancelDeleteItem.emit).toHaveBeenCalledWith(true);
    });
  }));

  it('Should call confirmDeleteItem.emit when clicked on the button', async(() => {
    spyOn(component.confirmDeleteItem, 'emit');

    const button = fixture.debugElement.nativeElement.querySelector('.a-button--danger');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.confirmDeleteItem.emit).toHaveBeenCalledWith(true);
    });
  }));
});
