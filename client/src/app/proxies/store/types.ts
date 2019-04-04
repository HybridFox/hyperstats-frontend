import { Information } from 'src/app/reports/store/reports/types';

export interface ProxyBody {
  proxy: string;
  recyclingProcess: any; // TODO fix any
  year: number;
}

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
