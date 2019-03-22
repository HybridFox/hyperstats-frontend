import { Component, OnInit } from '@angular/core';
import { select, select$ } from '@angular-redux/store';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { uniq } from 'ramda';

import { CodesService } from 'src/app/core/services/codes/codes.service';
import { ReportsSelector } from '../../../reports/store/reports/selectors';
import { ReportsProcessSelector } from '../../../reports/store/recycling-processes/selectors';
import { Report, PopulatedRecyclingProcess } from '../../../reports/store/reports/types';
import { RecyclingProcess } from '../../../reports/store/recycling-processes/types';
import { CompanySelector } from '../../../manage-companies/store';
import { CompaniesActions } from '../../../manage-companies/store/companies/actions';

import { PROXY_OPTIONS } from '../../store/constants';
import { ProxiesActions, ProxiesSelectors } from '../../store';
import { Proxy, RenderedProxy } from '../../store/types';
import { ReportsActions } from 'src/app/reports/store/reports';
import { ReportsProcessActions } from 'src/app/reports/store/recycling-processes';
import { UserInterface } from '@store/auth/auth.interface';
import { companiesToSelectOptions } from '@helpers/select.helpers';
import { Option } from '@ui/form-fields/components/select/select.types';
import { CompanyType } from '@api/company';

@Component({
  templateUrl: './overview.page.html',
})

export class OverviewPageComponent implements OnInit {
  @select(['auth', 'user', 'result']) public user$: Observable<UserInterface>;
  @select$(CompanySelector.overview.result, companiesToSelectOptions) public $companyOptions: Observable<Option[]>;
  @select(ProxiesSelectors.list.result) public $proxies: Observable<Proxy[]>;
  @select(ReportsSelector.list.result) public $reports: Observable<Report[]>;
  @select(ReportsProcessSelector.list.result) public $recyclingProcesses: Observable<any[]>;

  public proxies: Proxy[];
  public reports: Report[];
  public recyclingProcesses: RecyclingProcess[];
  public years: string[];
  public proxiesForm: FormArray;
  public showAddCompany = false;
  public companies: Option[] = [];

  public extraCompanies = [];
  public selectedCompany: string;

  public PROXY_OPTIONS = PROXY_OPTIONS;

  public renderedProxies: RenderedProxy[];

  constructor(
    private proxiesActions: ProxiesActions,
    private reportActions: ReportsActions,
    private reportProcessActions: ReportsProcessActions,
    private companiesActions: CompaniesActions,
    private codesService: CodesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.proxiesActions.fetchAll().toPromise();
    this.reportActions.fetchAll({}).toPromise();
    this.reportProcessActions.fetchAllRecyclingProcesses().toPromise();
    this.companiesActions.fetchByType([CompanyType.CO, CompanyType.AO]).toPromise();

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

    this.$companyOptions.subscribe((companies) => {
      if (this.proxies) {
        this.removeProxyCompaniesFromCompanies(companies);
      } else {
        this.companies = companies;
      }
    });

    this.years = this.codesService.years().map(year => year.value);
  }

  public revokeProxy() {
    console.log('revokeProxy');
  }

  public toggleAddCompany() {
    this.showAddCompany = !this.showAddCompany;
  }

  public addCompany() {
    if (this.selectedCompany) {
      console.log(this.companies);
      console.log(this.selectedCompany);
      const newCompany = this.companies.find(company => company.value === this.selectedCompany);

      this.extraCompanies.push({
        proxyCompanyName: newCompany.label,
        proxyCompanyId: newCompany.value,
      });

      this.getProxiesFrom();
      this.removeProxyCompaniesFromCompanies(this.companies);
      this.selectedCompany = '';
    }
  }

  private removeProxyCompaniesFromCompanies(companies) {
    const shownCompanies = [...uniq(this.proxies.map(proxy => ({
      proxyCompanyName: proxy.proxyCompanyName,
      proxyCompanyId: proxy.proxyCompanyId
    }))), ...this.extraCompanies];

    this.companies = companies.filter(company => {
      return !shownCompanies.find(shownCompany => shownCompany.proxyCompanyId === company.value);
    });
  }

  private getProxiesFrom() {
    if (this.proxies && this.reports && this.recyclingProcesses && this.years) {
      this.proxiesForm = this.getProxies();
    }
  }

  private getProxies() {
    const companies = [...uniq(this.proxies.map(proxy => ({
      proxyCompanyName: proxy.proxyCompanyName,
      proxyCompanyId: proxy.proxyCompanyId
    }))), ...this.extraCompanies];

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
      const proxiesReports = proxy.processes
        .filter(process => process.process._id === recyclingProcess._id)
        .map(proxyProcess => proxyProcess.reports);

      if (proxiesReports.length === 0) {
        return false;
      }

      const matchingProxiesReports = proxiesReports.filter(proxyReport =>
        proxyReport.filter(item => item.data.information.reportingYear === parseInt(year, 10)).length > 0
      );

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
      return status === PROXY_OPTIONS.CHECKED;
  }
}
