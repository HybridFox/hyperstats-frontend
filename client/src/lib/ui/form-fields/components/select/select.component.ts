import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Option } from './select.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-select-input',
  templateUrl: './select.component.html',
})
export class SelectInputComponent implements OnInit, OnDestroy {
  @Input() label?: string;
  @Input() class?: string;
  @Input() description?: string;
  @Input() options: Option[];
  @Input() control: FormControl = new FormControl('');

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  trackOption(index, option) {
    return option ? option.value : undefined;
  }

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

  public firstError(): string {
    return Object.keys(this.control.errors)[0].toUpperCase();
  }

  public registerOnTouched() {}
}
