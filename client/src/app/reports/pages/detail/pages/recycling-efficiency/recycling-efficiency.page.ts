import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ElementType } from './recycling-efficiency.types';
import { groupBy } from 'ramda';
import { ReportsActions } from '../../../../store/reports';


@Component({
  templateUrl: './recycling-efficiency.page.html',
})
export class RecyclingEfficiencyPageComponent implements OnInit {
  public form: any;
  public types: any;
  public efficiency: number;
  private reportId: string;

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private reportActions: ReportsActions
  ) {}

  public ngOnInit() {
    this.mergeElements();
  }

  public previousStep() {
    this.router.navigate(['../output-fraction'], {relativeTo: this.activatedRoute});
  }

  public nextStep() {
    const data = {
      _id: this.reportId,
      data: this.formData.getFormData().getRawValue(),
    };

    let promise: Promise<any>;
    promise = this.reportActions.draft(data).toPromise();
        promise.then(() => {
          this.router.navigate(['../additional-information'], {relativeTo: this.activatedRoute});
        })
        .catch(() => {});
  }

  private mergeElements() {
    const inputs = this.formData.getFormData().get('inputFraction').value[0].elements.map(input => ({
      element: input.element,
      input: input.mass,
    }));

    const outputs = this.formData.getFormData().get('outputFraction').value.map(output => ({
      element: output.element,
      output: output.mass,
    }));

    const elements =  groupBy((item: ElementType) => item.element)([...inputs, ...outputs]);

    this.types = Object.keys(elements).map(element => {
      const inputNumbers = elements[element].reduce((previousState, currentItem) => {
        if (currentItem.input && !isNaN(parseInt(currentItem.input, 10))) {
            return previousState + parseInt(currentItem.input, 10);
        }

        return previousState;
      }, 0);

      const outputNumbers = elements[element].reduce((previousState, currentItem) => {
        if (currentItem.output && !isNaN(parseInt(currentItem.output, 10))) {
            return previousState + parseInt(currentItem.output, 10);
        }

        return previousState;
      }, 0);

      return {
        element: element,
        input: inputNumbers,
        output: outputNumbers,
      };
    });

    this.calculateEfficiency();
  }

  private calculateEfficiency () {
    const result = this.types.reduce((currentTotals, newItem) => (
      {
        input: (currentTotals.input + newItem.input),
        output: (currentTotals.output + newItem.output),
      }
    ), {input: 0, output: 0});

    const efficiency = (result.output / result.input) * 100;
    this.efficiency = parseFloat(efficiency.toFixed(2));

    this.formData
      .getFormData()
      .get('recyclingEfficiency.calculatedEfficiency')
      .setValue(this.efficiency);
  }
}
