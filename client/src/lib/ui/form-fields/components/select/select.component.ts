import { Component, forwardRef, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Option } from './select.types';
@Component({
  selector: 'app-select-input',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.html'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
})
export class SelectInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder = '';
  @Input() label?: string;
  @Input() description?: string;
  @Input() options: Option[];

  public value: FormControl = new FormControl('');
  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  public updateValue = (_: any) => {};

  public ngOnInit() {
    this.value.valueChanges.pipe(
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
    this.value.setValue(value);
  }

  public registerOnChange(fn) {
    this.updateValue = fn;
  }

  public registerOnTouched() {}
}
