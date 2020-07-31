import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { find } from 'lodash-es';
import { NgRedux } from '@angular-redux/store';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';

import { CoreActions } from '../../store';
import { Range } from '../../pages/monitor/monitor.types';
import { RangeService } from '../../services/range.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listeners',
  templateUrl: './listeners.component.html',
})
export class ListenersComponent implements OnInit, OnDestroy {
  @Input() public data: Observable<any>;
  @Input() public loading: Observable<boolean>;
  @Output() public rangeUpdated = new EventEmitter();
  @Output() public autorefreshUpdated = new EventEmitter();
  @Output() public refresh = new EventEmitter();

  private componentDestroyed$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private hasSendInitialRange = false;
  public autorefreshEnabled = true;

  public monitor: any;
  public form: FormGroup;
  public data$: Observable<any>;
  public mappedData$: Observable<any>;
  public liveData$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public colors: string[] = [];
  public dateRange: Range = {
    startDate: moment().subtract(12, 'hours'),
    endDate: moment()
  };
  public minDate = moment('2019-05-01');
  public maxDate = moment();
  public refreshDate = moment().add(60, 'seconds');
  public refreshIn = Math.ceil(moment().add(60, 'seconds').diff(moment()) / 1000);
  public activeEntries = [];
  public storedGroups = localStorage.getItem('storedGroups') ? JSON.parse(localStorage.getItem('storedGroups')) : null;

  constructor(
    private ngRedux: NgRedux<any>,
    private coreActions: CoreActions,
    public rangeService: RangeService,
    private formBuilder: FormBuilder,
  ) { }

  public ngOnInit() {
    setInterval(() => {
      this.refreshIn = Math.ceil(this.refreshDate.diff(moment()) / 1000);
    }, 1000);

    this.mappedData$ = this.data.pipe(
      filter((groups) => groups !== null && groups !== undefined),
      map((groups) => {
        this.refreshDate = moment().add(60, 'seconds');

        const mappedGroups = groups.map((group) => {
          const monitors = group.monitors.filter((monitor) => monitor.type !== 'default');
          const checks = monitors.map((monitor) => monitor.checks);
          const values = checks.reduce((acc, check) => {
            check = check.sort(function (a, b) {
              const bMapped = new Date(b._source.createdAt) as any;
              const aMapped = new Date(a._source.createdAt) as any;
              return bMapped - aMapped;
            });

            check.map((c, i) => {
              c = c._source;
              const listenersObject = find(c.values, { key: 'listeners' }) as any;
              if (!acc.hasOwnProperty(i)) {
                acc[i] = {
                  name: new Date(c ? c.createdAt : 0),
                  value: parseInt(listenersObject ? listenersObject.value : 0, 10)
                };
              } else {
                acc[i] = {
                  ...acc[i],
                  value: acc[i].value + parseInt(listenersObject ? listenersObject.value : 0, 10)
                };
              }
            });

            return acc;
          }, Array(checks[0].length));

          this.colors.push(group.color);

          return {
            name: group.name,
            color: group.color,
            series: (!this.storedGroups || this.storedGroups && this.storedGroups[group.name] === true) ? values : [],
            valuesAnyway: values
          };
        });

        this.liveData$.next(mappedGroups.map((group) => ({
          name: group.name,
          color: group.color,
          listeners: group.valuesAnyway[0].value
        })));

        this.form = this.formBuilder.group(mappedGroups.reduce((acc, group) => ({
          ...acc,
          [group.name]: [true]
        }), {}));
        if (localStorage.getItem('storedGroups')) {
          this.form.patchValue(JSON.parse(localStorage.getItem('storedGroups')));
        }
        this.form.valueChanges.subscribe((values) => this.handleFormChange(values));

        return mappedGroups;
      })
    );
  }

  trackByFn(index, item) {
    return item.name;
  }

  handleMouseEnter(group) {
    this.activeEntries = [{name: group.name}];
  }

  handleMouseLeave() {
    this.activeEntries = [];
  }

  handleFormChange(values) {
    localStorage.setItem('storedGroups', JSON.stringify(values));
    this.storedGroups = values;
    this.refresh.emit();
  }

  handleRangeUpdate() {
    this.rangeUpdated.emit(this.dateRange);

    if (this.hasSendInitialRange) {
      this.autorefreshEnabled = false;
      this.autorefreshUpdated.emit(false);
    }

    this.hasSendInitialRange = true;
  }

  enableAutorefresh(e: Event) {
    e.preventDefault();

    this.autorefreshEnabled = true;
    this.autorefreshUpdated.emit(true);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
