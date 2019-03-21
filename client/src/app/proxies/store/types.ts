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

export interface RenderedProxy {
  companyInfo: CompanyInfo;
  processes: RenderedProxyProcess[];
}

interface CompanyInfo {
  companyId: string;
  companyName: string;
}

interface RenderedProxyProcess {
  processInfo: ProcessInfo;
  reports: RenderedProxyReport[];
}

interface ProcessInfo {
  processName: string;
  processId: string;
}

interface RenderedProxyReport {
  year: string;
  status: string;
}
