import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { select$, select } from '@angular-redux/store';
import { map } from 'rxjs/operators';

import { MenuItem } from '@shared/components/vertical-menu/vertical-menu.types';
import { ReportsProcessSelector } from 'src/app/reports/store/recycling-processes';
import { mapToStepMenuItems } from 'src/app/reports/services/select.helpers';
import { FormDataService } from 'src/app/reports/services/formdata.service';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './step-wrapper.page.html',
})
export class StepWrapperPageComponent implements OnInit {
  @select$(ReportsProcessSelector.detail.result, mapToStepMenuItems) public siteMenuItems$: BehaviorSubject<MenuItem[]>;
  @select(ReportsProcessSelector.detail.result) public process$: BehaviorSubject<any>;
  public title$;
  public currentForm: FormArray;
  public sideItems = [];

  private componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  public stepWrapperItems = {
    'input-fraction': 'inputFraction',
    'additives': 'additives',
    'output-fraction': 'outputFraction',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formData: FormDataService,
  ) {}

  public ngOnInit() {
    if (!this.route.firstChild) {
      this.siteMenuItems$
        .pipe(
          takeUntil(this.componentDestroyed$)
        )
        .subscribe((links) => {
          if (this.sideItems.length === 0) {
            this.sideItems = links;

            setTimeout(() => {
              this.handleStepValidation();
            }, 0);
          }
          if (links.length > 0) {
            this.router.navigate(links[0].link, { relativeTo: this.route });
          }
        });
    }

    setTimeout(() => {
      this.title$ = combineLatest(
        this.process$,
        this.route.firstChild ? this.route.firstChild.params : null
      )
      .pipe(
        map(([process, params]) => {
          if (!process) {
            return;
          }
          return process.data.steps.find((step) => {
            return step.uuid === params.stepId;
          });
        }),
        map((step) => {
          if (!step) {
            return;
          }
          return step.description || 'WIZARD.NEW-REPORT.LABELS.RECYCLING-PROCESS';
        }),
      );
    }, 1);
  }

  private handleStepValidation() {
    this.currentForm = this.formData.formGroup.get(this.stepWrapperItems[this.route.routeConfig.path]) as FormArray;
    this.currentForm.controls.forEach(control => {
      this.setValidValue(control as FormGroup);
      control.valueChanges
        .pipe(
          takeUntil(this.componentDestroyed$)
        )
        .subscribe(() => {
          this.setValidValue(control as FormGroup);
        });
    });
  }

  private setValidValue(control: FormGroup) {
    const currentItem = this.sideItems.find(item => item.link[1] === control.value.siteRef);
    if (currentItem) {
      currentItem.valid = control.valid;
    }
  }
}
