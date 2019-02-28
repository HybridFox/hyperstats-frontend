import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '@api/config.service';

import { ReportsType } from './reports.types';

@Injectable()
export class ReportsRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchAll(filters: ReportsType): Observable<any> {
    const url = this.apiConfig.baseUrl('/reports');

    const options = filters.processId ?
      { params: new HttpParams().set('recycling-process', filters.processId) } : {};

    return this.http.get(url, options);
  }

  public fetchById(id: string): Observable<any> {
    const url = this.apiConfig.baseUrl(`/reports/${id}`);

    return this.http.get(url);
  }

  public create(report: any): Observable<any> {
    const url = this.apiConfig.baseUrl('/reports');

    return this.http.post(url, report);
  }

  public update(id: string, report: any): Observable<any> {
    const url = this.apiConfig.baseUrl(`/reports/${id}`);

    return this.http.put(url, report);
  }
}
