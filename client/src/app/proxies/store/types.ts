import { Information } from 'src/app/reports/store/reports/types';
import { PROXY_OPTIONS } from './constants';

export interface ProxyBody {
  proxy: string;
  recyclingProcess: string;
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
