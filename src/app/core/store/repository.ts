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

  public fetchAllGroups(): Observable<any> {
    const url = this.apiConfig.baseUrl('/groups');

    return this.http.get(url);
  }

  public fetchMonitor(monitorId: string): Observable<any> {
    const url = this.apiConfig.baseUrl(`/monitors/${monitorId}`);

    return this.http.get(url);
  }
}
