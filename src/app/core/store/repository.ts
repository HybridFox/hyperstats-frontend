import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';

@Injectable()
export class CoreRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchAllGroups(sparse = true, dateRange): Observable<any> {
    const url = this.apiConfig.baseUrl(`/groups`);

    return this.http.get(url, {
      params: {
        sparse: sparse.toString(),
        ...dateRange && dateRange.endDate && { endDate: dateRange.endDate.unix() },
        ...dateRange && dateRange.startDate && { startDate: dateRange.startDate.unix() },
      }
    });
  }

  public fetchMonitor(monitorId: string, sparse = true, dateRange: any): Observable<any> {
    const url = this.apiConfig.baseUrl(`/monitors/${monitorId}`);

    return this.http.get(url, {
      params: {
        sparse: sparse.toString(),
        ...dateRange && dateRange.endDate && { endDate: dateRange.endDate.unix() },
        ...dateRange && dateRange.startDate && { startDate: dateRange.startDate.unix() },
      }
    });
  }
}
