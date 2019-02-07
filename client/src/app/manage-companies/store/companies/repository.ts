import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';

@Injectable()
export class CompaniesRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchAll(): Observable<any> {
    return this.http.get(this.apiConfig.baseUrl('/companies'));
  }

  public fetchById(id: string): Observable<any> {
    return this.http.get(this.apiConfig.baseUrl(`/companies/${id}`));
  }
}
