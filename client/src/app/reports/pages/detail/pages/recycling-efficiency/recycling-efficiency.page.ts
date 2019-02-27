import { Component } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ElementType } from './recycling-efficiency.types';
import { groupBy } from 'ramda';
import { ReportsActions } from '../../../../store/reports';
import { StepPageAbstract } from '../step-page.abstract';
import { ToastrService } from 'ngx-toastr';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';

@Component({
  templateUrl: './recycling-efficiency.page.html',
})
export class RecyclingEfficiencyPageComponent extends StepPageAbstract {
  public form: any;
  public types: any;

  constructor(
    codesService: CodesService,
    formData: FormDataService,
    toastrService: ToastrService,
    reportProcessActions: ReportsProcessActions,
    router: Router,
    activatedRoute: ActivatedRoute,
    reportActions: ReportsActions,
  ) {
    super(
      codesService,
      formData,
      toastrService,
      reportProcessActions,
      router,
      activatedRoute,
      reportActions,
      {
        prevStep: ['../output-fraction'],
        nextStep: ['../file-report'],
        formSection: 'outputFraction'
      }
    );
  }

  public onFormReady() {
    this.mergeElements();
  }

  private mergeElements() {
    const inputs = this.formData.getFormData().getRawValue().inputFraction.reduce((acc, step) => {
      return acc.concat(step.data.elements.map((input) => ({
        element: input.element,
        input: input.mass,
      })));
    }, []);

    const outputs = this.formData.getFormData().getRawValue().outputFraction.reduce((acc, step) => {
      return acc.concat(step.data.map((input) => ({
        element: input.element,
        output: input.mass,
      })));
    }, []);

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

    if (result.output !== 0 && result.input !== 0) {
      const efficiency = (result.output / result.input) * 100;
      this.formData
        .getFormData()
        .get('recyclingEfficiency.calculatedEfficiency')
        .setValue(parseFloat(efficiency.toFixed(2)));
    }
  }
}
