import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';
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
  @select(ReportsSelector.list.result) public $reports: Observable<Report[]>;
  @select(ReportsProcessSelector.list.result) public $recyclingProcesses: Observable<any[]>;

  public proxies: Proxy[];
  public reports: Report[];
  public recyclingProcesses: RecyclingProcess[];
  public years: string[];
  public proxiesForm: FormArray;

  public PROXY_OPTIONS = PROXY_OPTIONS;

  public renderedProxies: RenderedProxy[];

  constructor(
    private proxiesActions: ProxiesActions,
    private codesService: CodesService,
    private formBuilder: FormBuilder
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
      this.proxiesForm = this.getProxies();
      console.log(this.proxiesForm);
    }
  }


  private getProxies() {
    const companies = uniq(this.proxies.map(proxy => ({
      proxyCompanyName: proxy.proxyCompanyName,
      proxyCompanyId: proxy.proxyCompanyId
    })));

    return this.formBuilder.array(companies.map(company => {
      const companyProxies = this.proxies.filter(proxy => company.proxyCompanyId === proxy.proxyCompanyId);

      return {
        companyInfo: {
          companyName: company.proxyCompanyName,
          companyId: company.proxyCompanyId,
        },
        processes: this.getProcessesFormArray(this.recyclingProcesses, companyProxies),
      };
    }));
  }

  private getProcessesFormArray(recyclingProcesses, companyProxies) {
    return this.formBuilder.array(recyclingProcesses.map(recyclingProcess => ({
      processInfo: {
        processName: recyclingProcess.data.name,
        processId: recyclingProcess._id,
      },
      reports: this.getReportsFormArray(recyclingProcess, companyProxies),
    })));
  }

  private getReportsFormArray(recyclingProcess, companyProxies) {
    return this.formBuilder.array(this.years.map(year => {
      const status = this.getStatus(this.reports, year, recyclingProcess, companyProxies);
      const value =  this.getValue(status);
      return this.formBuilder.group({
        year: year,
        status: status,
        value: new FormControl({value: value, disabled: status === PROXY_OPTIONS.DISABLED}),
      });
    }));
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

  public getValue(status) {
    if (status === PROXY_OPTIONS.DISABLED || status === PROXY_OPTIONS.UNCHECKED) {
      return false;
    }
    return true;
  }
}
