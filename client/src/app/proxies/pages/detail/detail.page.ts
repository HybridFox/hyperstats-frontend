import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';

import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ProxiesActions, ProxiesSelectors } from '../../store';
import { RecyclingProcessesActions, RecyclingProcessesSelectors } from '../../../recycling-processes/store';
import { Proxy } from '../../store/types';

@Component({
  templateUrl: './detail.page.html',
})

export class DetailPageComponent implements OnInit {
  @select(ProxiesSelectors.list.result) public $proxies: Observable<Proxy[]>;
  @select(RecyclingProcessesSelectors.list.result) public $recyclingProcesses: Observable<any[]>;

  public proxies: any[];
  public years: any[];

  constructor(
    private proxiesActions: ProxiesActions,
    private codesService: CodesService,
  ) {}

  ngOnInit() {
    this.proxiesActions.fetchAll().toPromise();

    this.$recyclingProcesses.subscribe((recyclingProcesses) => {
      console.log(recyclingProcesses);
    });

    this.years = this.codesService.years().map(year => year.value);
    this.$proxies.subscribe((proxies) => {
      if (proxies) {
        this.proxies = proxies.map(proxy => ({
          proxyCompanyId: proxy.proxyCompanyId,
          proxyCompanyName: proxy.proxyCompanyName,
          processes: proxy.processes.map(process => ({
            process: process.process.data.name,
            reports: this.years.map(year => (
              {
                year: parseInt(year, 10),
                active: process.reports.filter(report => report.data.information.reportingYear === parseInt(year, 10)).length > 0,
              }
            )),
          }))
        }));
      }
    });
  }

  public revokeProxy() {
    console.log('revokeProxy');
  }
}
