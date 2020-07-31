import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { find } from 'lodash-es';
import { NgRedux } from '@angular-redux/store';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { CoreActions, CoreSelectors } from '../../store';
import { monitor } from '../../store/monitor/selectors';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
})
export class MonitorComponent implements OnInit, OnDestroy {
  @Input() public monitor: any;

  private componentDestroyed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public data$: Observable<any>;
  public xScaleMin = new Date(new Date().getTime() - (6 * 60 * 60 * 1000));
  public yScaleMax = 2000;

  constructor(
    private ngRedux: NgRedux<any>,
    private coreActions: CoreActions,
  ) { }

  ngOnInit() {
    this.coreActions.fetchDashboardMonitor(this.monitor.id, true).subscribe();
    this.data$ = this.ngRedux.select([...CoreSelectors.dashboardMonitor.result, this.monitor.id]).pipe(
      filter(data => data !== undefined && data !== null),
      map((monitorData: any) => {
        return monitorData.checks[0]._source.values
          .filter(valueType => valueType.key !== 'statusCode')
          .sort((a, b) => {
            if (a.key < b.key) { return -1; }
            if (a.key > b.key) { return 1; }
            return 0;
          })
          .map((valueType, index) => {
            return {
              name: valueType.key,
              series: monitorData.checks.map((checkData) => {
                const c = find(checkData._source.values, { key: valueType.key }) as any;
                return {
                  name: new Date(checkData._source.createdAt),
                  value: c ? c.value : 0
                };
              })
          };
          });
      })
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
