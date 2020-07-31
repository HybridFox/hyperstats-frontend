import { Component, OnInit } from '@angular/core';
import { CoreActions, CoreSelectors } from '../../store';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { first, map, filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { find } from 'lodash-es';
import * as moment from 'moment';
import { Range } from './monitor.types';
import { RangeService } from '../../services/range.service';

@Component({
  templateUrl: './monitor.page.html'
})
export class MonitorPageComponent implements OnInit {
  @select(CoreSelectors.monitor.result) public data$: Observable<any>;
  @select(CoreSelectors.monitor.loading) public loading$: Observable<any>;

  public mappedData$: Observable<any>;
  public monitor: any;
  public dateRange: Range = {
    startDate: moment().subtract(3, 'days'),
    endDate: moment()
  };

  public minDate = moment('2019-05-01');
  public maxDate = moment();

  constructor(
    private coreActions: CoreActions,
    private route: ActivatedRoute,
    public rangeService: RangeService
  ) { }

  handleRangeUpdate() {
    this.fetch();
  }

  ngOnInit() {
    this.fetch();

    this.mappedData$ = this.data$.pipe(
      filter(data => data !== undefined && data !== null),
      map((monitorData: any) => {
        this.monitor = monitorData;
        const checks = monitorData.checks[0]._source;
        return checks ? checks.values
          .filter(valueType => valueType.key !== 'statusCode')
          .sort(function (a, b) {
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
          }) : [];
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
