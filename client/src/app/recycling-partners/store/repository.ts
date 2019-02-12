import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';

@Injectable()
export class RecyclingPartnerRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchAll(): Observable<any> {
    const url = this.apiConfig.baseUrl('/companies?type=RP');

    return this.http
      .get(url);
  }

  public fetchDetail(id: string): Observable<any> {
    const url = this.apiConfig.baseUrl(`/companies/${id}`);

    return this.http
      .get(url);
  }

  public create(company: any) {
    const url = this.apiConfig.baseUrl('/companies?type=RP');

    return this.http
      .post(url, company);
  }

  public update(id, company: any) {
    const url = this.apiConfig.baseUrl(`/companies/${id}`);

    return this.http
      .put(url, company);
  }

  public remove(id: string) {
    const url = this.apiConfig.baseUrl(`/companies/${id}`);

    return this.http
      .delete(url);
  }

  public activate(id: string) {
    const url = this.apiConfig.baseUrl(`/company/${id}/activate`);

    return this.http
      .patch(url, {});
  }

  public deactivate(id: string) {
    const url = this.apiConfig.baseUrl(`/company/${id}/deactivate`);

    return this.http
      .patch(url, {});
  }
}
