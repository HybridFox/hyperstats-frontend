import { Component, ViewEncapsulation, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { FormDataService } from './services/formdata.service';
import { FormGroup } from '@angular/forms';
import { Router, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-new-report',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './new-report.component.html',
})
export class NewReportComponent implements OnInit, OnDestroy, AfterContentInit {
  public data: FormGroup;
  public steps: any[]; // TODO: Type
  public selectedIndex = 0;
  public componentDestroyed$: Subject<Boolean> = new Subject<boolean>();

  constructor(
    private formData: FormDataService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          const route = event.url.split('/').slice(-1)[0];
          this.selectedIndex = this.steps.reduce((acc, step, index) => step.route === route ? index : acc, 0);
        }
      });

    this.data = this.formData.getFormData();
    this.steps = [
      {
        name: 'New Report',
        route: 'information'
      },
      {
        name: 'Input Fraction',
        route: 'input-fraction'
      },
      {
        name: 'Additives',
        route: 'additives'
      },
      {
        name: 'Output Fraction',
        route: 'output-fraction'
      },
      {
        name: 'Recycling Efficiency',
        route: 'recycling-efficiency'
      },
      {
        name: 'Add. Information',
        route: 'additional-information'
      },
      {
        name: 'File Report',
        route: 'file-report'
      },
    ];
  }

  public ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

  public ngAfterContentInit(): void {
    this.selectedIndex = this.steps.reduce((acc, step, index) => step.route === this.router.url.split('/').slice(-1)[0] ? index : acc, 0);
  }
}
