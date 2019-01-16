import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Component, QueryList } from '@angular/core';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  providers: [{ provide: CdkStepper, useExisting: StepsComponent }],
})
export class StepsComponent extends CdkStepper {
  linear: boolean;
  selectedIndex: number;
  _steps: QueryList<CdkStep>;

  constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
    super(dir, changeDetectorRef);
  }
}
