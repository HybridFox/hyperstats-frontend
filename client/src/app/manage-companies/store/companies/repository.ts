import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';
import { CompanyType } from './types';

@Injectable()
export class CompaniesRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchByTypes(types: CompanyType[]): Observable<any> {

    return this.http.get(this.apiConfig.baseUrl(`/companies`), {
      params: types ? { 'type': types } : {}
    });
  }

  public fetchById(id: string): Observable<any> {
    return this.http.get(this.apiConfig.baseUrl(`/companies/${id}`));
  }
}
