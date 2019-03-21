import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { uniq } from 'ramda';

import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ReportsSelector } from '../../../reports/store/reports/selectors';
import { ReportsProcessSelector } from '../../../reports/store/recycling-processes/selectors';
import { Report, PopulatedRecyclingProcess } from '../../../reports/store/reports/types';
import { RecyclingProcess } from '../../../reports/store/recycling-processes/types';

import { PROXY_OPTIONS } from '../../store/constants';
import { ProxiesActions, ProxiesSelectors } from '../../store';
import { Proxy, RenderedProxy } from '../../store/types';

@Component({
  templateUrl: './detail.page.html',
})

export class DetailPageComponent implements OnInit {
  @select(ProxiesSelectors.list.result) public $proxies: Observable<Proxy[]>;
  @select(ReportsSelector.list.result) public $reports: Observable<any[]>;
  @select(ReportsProcessSelector.list.result) public $recyclingProcesses: Observable<any[]>;

  public proxies: Proxy[];
  public reports: Report[];
  public recyclingProcesses: RecyclingProcess[];
  public years: string[];

  public PROXY_OPTIONS = PROXY_OPTIONS;

  public renderedProxies: RenderedProxy[];

  constructor(
    private proxiesActions: ProxiesActions,
    private codesService: CodesService,
  ) { }

  ngOnInit() {
    this.proxiesActions.fetchAll().toPromise();

    this.$reports.subscribe((reports) => {
      this.reports = reports;
      this.getProxiesFrom();
    });

    this.$recyclingProcesses.subscribe((recyclingProcesses) => {
      this.recyclingProcesses = recyclingProcesses;
      this.getProxiesFrom();
    });

    this.$proxies.subscribe((proxies) => {
      this.proxies = proxies;
      this.getProxiesFrom();
    });

    this.years = this.codesService.years().map(year => year.value);
  }

  public revokeProxy() {
    console.log('revokeProxy');
  }

  private getProxiesFrom() {
    if (this.proxies && this.reports && this.recyclingProcesses && this.years) {
      const companies = uniq(this.proxies.map(proxy => ({
        proxyCompanyName: proxy.proxyCompanyName,
        proxyCompanyId: proxy.proxyCompanyId
      })));

      this.renderedProxies = companies.map(company => {
        const companyProxies = this.proxies.filter(proxy => company.proxyCompanyId === proxy.proxyCompanyId);

        return {
          companyInfo: {
            companyName: company.proxyCompanyName,
            companyId: company.proxyCompanyId,
          },
          processes: this.recyclingProcesses.map(recyclingProcess => ({
            processName: recyclingProcess.data.name,
            reports: this.years.map(year => ({
              year: year,
              status: this.getStatus(this.reports, year, recyclingProcess, companyProxies), // Disabled | empty | semi | selected
            })),
          })),
        };
      });
    }
  }
  private getStatus(reports: Report[], year: string, recyclingProcess: RecyclingProcess, companyProxies: Proxy[]) {
    const matchingReports = reports.filter(report => (
      report.data.information.reportingYear === parseInt(year, 10) &&
      (report.data.information.recyclingProcess as PopulatedRecyclingProcess)._id === recyclingProcess._id
    ));

    if (matchingReports.length === 0) {
      return PROXY_OPTIONS.DISABLED;
    }

    const matchingProxies = companyProxies.filter(proxy => {
      const matchingProxiesProcess = proxy.processes.filter(process => process.process._id === recyclingProcess._id);
      if (matchingProxiesProcess.length === 0) {
        return false;
      }

      const proxiesReports = matchingProxiesProcess.map(proxyProcess => proxyProcess.reports);
      if (proxiesReports.length === 0) {
        return false;
      }

      const matchingProxiesReports = proxiesReports.filter(proxyReport => {
        const proxyReportItem = proxyReport.filter(item => item.data.information.reportingYear === parseInt(year, 10));
        return proxyReportItem.length > 0;
      });

      return matchingProxiesReports.length > 0;
    });

    if (matchingProxies.length === 0) {
      return PROXY_OPTIONS.UNCHECKED;
    }

    if (matchingReports.length > 1 && matchingProxies.length !== matchingReports.length) {
      return PROXY_OPTIONS.SEMI_CHECKED;
    }

    if (matchingProxies.length === 1) {
      return PROXY_OPTIONS.CHECKED;
    }
  }
}
