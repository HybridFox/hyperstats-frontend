import { Component, Input, OnInit } from '@angular/core';
import { find } from "lodash-es";
import { NgRedux } from '@angular-redux/store';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { CoreActions, CoreSelectors } from "../../store";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
})
export class MonitorComponent implements OnInit {
  @Input() public monitor: any;

  private componentDestroyed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public data$: Observable<any>;
  public xScaleMin = new Date(new Date().getTime() - (1 * 60 * 60 * 1000));
  public yScaleMax = 2000;

  constructor(
    private ngRedux: NgRedux<any>,
    private coreActions: CoreActions,
  ) { }

  ngOnInit() {
    this.coreActions.fetchMonitor(this.monitor.id).subscribe();
    this.data$ = this.ngRedux.select([...CoreSelectors.monitor.result, this.monitor.id]).pipe(
      filter(data => data !== undefined && data !== null),
      map(monitorData => {
        return monitorData.checks[0].values
          .filter(valueType => valueType.key !== "statusCode")
          .sort(function(a, b){
            if(a.key < b.key) { return -1; }
            if(a.key > b.key) { return 1; }
            return 0;
          })
          .map((valueType, index) => ({
            name: valueType.key,
            series: monitorData.checks.map((checkData) => ({
              name: new Date(checkData.createdAt),
              value: find(checkData.values, { key: valueType.key }).value
            }))
        }))
      })
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
