import { Component, OnInit } from "@angular/core";
import { CoreActions, CoreSelectors } from "../../store";
import { select$ } from "@angular-redux/store";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  templateUrl: "./dashboard.page.html"
})
export class DashboardPageComponent implements OnInit {
  // TODO: move this somewhere decently
  @select$(CoreSelectors.list.result, obs$ =>
    obs$.pipe(
      filter(data => data !== null),
      map(data =>
        data.map(monitor => ({
          name: monitor.name,
          series: monitor.checks.map(check => ({
            name: new Date(check.createdAt),
            value: check.ping
          }))
        }))
      )
    )
  )
  public data$: Observable<any>;

  single: any[];
  multi: any[];

  view: any[] = [undefined, 400];

  xAxisLabel = "Time";
  yAxisLabel = "Listeners";

  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };

  constructor(private coreActions: CoreActions) {}

  ngOnInit() {
    this.coreActions.fetchAll().subscribe();
  }
}
