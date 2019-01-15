import { Component, forwardRef, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.html'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxInputComponent),
      multi: true,
    },
  ],
})
export class CheckboxInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder = '';
  @Input() label?: string;
  @Input() suffix?: string;
  @Input() description?: string;
  @Input() type = 'text';
  @Input() class?: string;
  @Input() control: FormControl = new FormControl('');

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  public updateValue = (_: any) => {};

  public ngOnInit() {
    this.control.valueChanges.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe((value) => {
      this.updateValue(value);
    });
  }

  public ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public writeValue(value: string) {
    this.control.setValue(value);
  }

  public registerOnChange(fn) {
    this.updateValue = fn;
  }

  public registerOnTouched() {}
}
