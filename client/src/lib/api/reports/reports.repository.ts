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
    if (filters.processId) {
      if (filters.sortBy) {
        return this.http.get(url, { params: new HttpParams().set('recycling-process', filters.processId).set('sortBy', filters.sortBy) });
      }
      return this.http.get(url, { params: new HttpParams().set('recycling-process', filters.processId) });
    }

    if (filters.recyclerId) {
      if (filters.sortBy) {
        return this.http.get(url, { params: new HttpParams().set('recycler', filters.recyclerId).set('sortBy', filters.sortBy) });
      }
      return this.http.get(url, { params: new HttpParams().set('recycler', filters.recyclerId) });
    }

    if (filters.sortBy) {
      return this.http.get(url, { params: new HttpParams().set('sortBy', filters.sortBy) });
    }

    return this.http.get(url);
  }

  public fetchAllCompanies(): Observable<any> {
    const url = this.apiConfig.baseUrl('/reports/companies');

    return this.http.get(url);
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
