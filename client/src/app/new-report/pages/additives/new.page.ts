import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  templateUrl: './new.page.html',
})
export class NewPageComponent implements OnInit {
  public formGroup: FormArray;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  public ngOnInit() {
    this.formGroup = this.formBuilder.array([ this.createOutputElement() ]);
  }

  private createOutputElement(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
    });
  }

  public addItem(): void {
    this.formGroup.push(this.createOutputElement());
  }
}
