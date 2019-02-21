import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';
import { CompanyType } from './company.types';

@Injectable()
export class CompanyRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchByType(types: CompanyType[]): Observable<any> {
    return this.http.get(this.apiConfig.baseUrl(`/companies`), {
      params: types ? { 'type': types } : {}
    });
  }

  public fetchById(id: string): Observable<any> {
    return this.http.get(this.apiConfig.baseUrl(`/companies/${id}`));
  }

  public create(company: any) {
    return this.http.post(this.apiConfig.baseUrl(`/companies`), company);
  }

  public update(id: string, company: any) {
    return this.http.put(this.apiConfig.baseUrl(`/companies/${id}`), company);
  }

  public remove(id: string) {
    return this.http.delete(this.apiConfig.baseUrl(`/companies/${id}`));
  }

  public activate(id: string) {
    return this.http.patch(this.apiConfig.baseUrl(`/companies/${id}/activate`), {});
  }

  public deactivate(id: string) {
    return this.http.patch(this.apiConfig.baseUrl(`/companies/${id}/deactivate`), {});
  }
}

