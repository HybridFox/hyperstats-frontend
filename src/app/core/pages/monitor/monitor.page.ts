import { Component, OnInit } from '@angular/core';
import { CoreActions, CoreSelectors } from '../../store';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { first, map, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { find } from 'lodash-es';
import * as moment from 'moment';
import { Range } from './monitor.types';

@Component({
  templateUrl: './monitor.page.html'
})
export class MonitorPageComponent implements OnInit {
  @select(CoreSelectors.monitor.result) public data$: Observable<any>;
  @select(CoreSelectors.monitor.loading) public loading$: Observable<any>;

  public mappedData$: Observable<any>
  public monitor: any;
  public dateRange: Range = {
    startDate: moment().subtract(3, 'days'),
    endDate: moment()
  };
  public locale = {
    format: 'DD MMMM YYYY HH:mm',
  }
  public ranges: any = {
    'Last': {
      Day: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      Week: [moment().subtract(1, 'weeks').startOf('isoWeek'), moment().subtract(1, 'weeks').endOf('isoWeek')],
      '2 Weeks': [moment().subtract(2, 'weeks').startOf('isoWeek'), moment().subtract(1, 'weeks').endOf('isoWeek')],
    },
    'Current': {
      Day: [moment().startOf('day'), moment().endOf('day')],
      Week: [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
    }
  };
  public minDate = moment("2019-04-25");
  public maxDate = moment();

  constructor(
    private coreActions: CoreActions,
    private route: ActivatedRoute
  ) { }

  handleRangeUpdate() {
    this.fetch()
  }

  ngOnInit() {
    this.fetch();

    this.mappedData$ = this.data$.pipe(
      filter(data => data !== undefined && data !== null),
      map((monitorData: any) => {
        this.monitor = monitorData;
        const checks = monitorData.checks[0];
        return checks ? checks.values
          .filter(valueType => valueType.key !== "statusCode")
          .sort(function (a, b) {
            if (a.key < b.key) { return -1; }
            if (a.key > b.key) { return 1; }
            return 0;
          })
          .map((valueType, index) => {
            return {
              name: valueType.key,
              series: monitorData.checks.map((checkData) => {
                const c = find(checkData.values, { key: valueType.key }) as any;
                return {
                  name: new Date(checkData.createdAt),
                  value: c ? c.value : 0
                }
              })
            }
          }) : []
      })
    );
  }

  private fetch() {
    this.coreActions.fetchMonitor(this.route.snapshot.paramMap.get('monitorId'), this.dateRange)
      .pipe(
        first()
      ).subscribe();
  }
}
