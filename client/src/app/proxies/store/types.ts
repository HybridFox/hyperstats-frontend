import { Information } from 'src/app/reports/store/reports/types';

export interface Proxy {
  proxyCompanyId: string;
  proxyCompanyName: string;
  processes: ProxyProcess[];
}

interface ProxyProcess {
  process: {
    _id: string;
    data: {
      name: string;
    };
  };
  reports: ProxyReport[];
}

interface ProxyReport {
  _id: string;
  meta: {
    created: string;
    status: string;
  };
  data: {
    information: Information;
  };
}


export interface ShownProxy {
  proxyCompanyId: string;
  proxyCompanyName: string;
  processes: ShownProxyProcess[];
}

interface ShownProxyProcess {
  process: string;
  reports: ReportYears[];
}

interface ReportYears {
  year: number;
  active: boolean;
}
