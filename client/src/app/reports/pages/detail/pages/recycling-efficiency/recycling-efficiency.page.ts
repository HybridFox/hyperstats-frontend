import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../../../services/formdata.service';
import { CodesService } from 'src/app/core/services/codes/codes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '@helpers/form.helper';

import { ElementType } from './recycling-efficiency.types';
import { groupBy } from 'ramda';
import { _ as ngxExtract } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  templateUrl: './recycling-efficiency.page.html',
})
export class RecyclingEfficiencyPageComponent implements OnInit {
  public form: any;
  public types: any;
  public efficiency: number;

  constructor(
    public codesService: CodesService,
    public formData: FormDataService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.mergeElements();
  }

  public previousStep() {
    this.router.navigate(['../output-fraction'], {relativeTo: this.activatedRoute});
  }

  public nextStep() {
    FormHelper.markAsDirty(this.form);

    if (this.form.valid) {
      this.router.navigate(['../additional-information'], {relativeTo: this.activatedRoute});
    } else {
      this.toastrService.error(ngxExtract('GENERAL.LABELS.INVALID_FORM') as string);
    }
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
