import { Component, Input, OnInit } from '@angular/core';
import { CoreActions, CoreSelectors } from '../../store';
import { NgRedux } from '@angular-redux/store';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
})
export class MonitorComponent implements OnInit {
  @Input() public monitor: any;

  public data$: Observable<any>;
  public xScaleMin = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  public yScaleMax = 2000;

  constructor(
    private ngRedux: NgRedux<any>,
    private coreActions: CoreActions,
  ) { }

  ngOnInit() {
    this.coreActions.fetchMonitor(this.monitor.id).subscribe();
    this.data$ = this.ngRedux.select([...CoreSelectors.monitor.result, this.monitor.id]).pipe(
      filter(data => data !== undefined && data !== null),
      map(data => ([{
        name: data.name,
        series: data.checks.map(check => ({
          name: new Date(check.createdAt),
          value: check.ping
        }))
      }])
      )
    );

    this.data$.subscribe(val => console.log(val));
  }
}
