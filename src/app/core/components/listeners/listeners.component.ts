import { Component, Input, OnInit } from '@angular/core';
import { find } from "lodash-es";
import { NgRedux } from '@angular-redux/store';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

import { CoreActions, CoreSelectors } from "../../store";

@Component({
  selector: 'app-listeners',
  templateUrl: './listeners.component.html',
})
export class ListenersComponents implements OnInit {
  @Input() public data: Observable<any>;
  public mappedData$: Observable<any>;
  public colors: string[] = [];

  private componentDestroyed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public data$: Observable<any>;
  public xScaleMin = new Date(new Date().getTime() - (6 * 60 * 60 * 1000));
  public yScaleMax = 2000;

  constructor(
    private ngRedux: NgRedux<any>,
    private coreActions: CoreActions,
  ) { }

  ngOnInit() {
    this.mappedData$ = this.data.pipe(
      filter((groups) => groups !== null && groups !== undefined),
      map((groups) => {
        return groups.map((group) => {
          const monitors = group.monitors.filter((monitor) => monitor.type !== "default");
          const checks = monitors.map((monitor) => monitor.checks);
          console.log(checks)
          const values = checks.reduce((acc, check) => {
            check.map((c, i) => {
              const listenersObject = find(c.values, { key: 'listeners' }) as any;
              if (!acc.hasOwnProperty(i)) {
                acc[i] = {
                  name: new Date(c ? c.createdAt : 0),
                  value: parseInt(listenersObject ? listenersObject.value : 0)
                }
              } else {
                acc[i] = {
                  ...acc[i],
                  value: acc[i].value + parseInt(listenersObject ? listenersObject.value : 0)
                }
              }
            })

            return acc;
          }, Array(checks[0].length))
          this.colors.push(group.color)

          return {
            name: group.name,
            series: values
          }
        })
      })
    )
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
