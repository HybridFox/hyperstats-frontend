import { Component, forwardRef, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isNil } from 'ramda';

@Component({
  selector: 'app-mass-input',
  templateUrl: './mass-input.component.html',
  styleUrls: ['./mass-input.component.html'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MassInputComponent),
      multi: true,
    },
  ],
})
export class MassInputComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() placeholder = '';
  @Input() label?: string;
  @Input() suffix?: string;
  @Input() description?: string;
  @Input() type = 'text';
  @Input() class?: string;
  @Input() disabled = false;
  @Input() control: FormControl = new FormControl('');
  @Input() form: FormArray;

  public percentage = 0;

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  public updateValue = (_: any) => {};

  public ngOnInit() {
    this.control.valueChanges.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe((value) => {
      this.updateValue(value);
    });

    this.form.valueChanges.pipe(
      takeUntil(this.componentDestroyed$),
    ).subscribe((value) => {
      this.percentage = this.calculatePercentage(this.control.value);
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled) {
      this.setDisabledState(this.disabled);
    }

    this.percentage = this.calculatePercentage(this.control.value);
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

  public setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  public firstError(): string {
    return Object.keys(this.control.errors)[0].toUpperCase();
  }

  public registerOnTouched() {}

  private calculatePercentage(mass: number) {
    const totalWeight = this.form.value.reduce((currentTotal, item) =>
      item.mass !== '' && !isNaN(parseInt(item.mass, 10)) ?
      currentTotal + parseInt(item.mass, 10) :
      currentTotal,
    0);

    if (isNil(totalWeight) || isNil(mass)) {
      return;
    }

    const percentage = mass / totalWeight * 100;
    return parseFloat(percentage.toFixed(2));
  }
}
