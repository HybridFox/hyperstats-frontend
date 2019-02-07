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
    const url = this.apiConfig.baseUrl('/company/type/RP');

    return this.http
      .get(url);
  }

  public fetchDetail(id: string): Observable<any> {
    const url = this.apiConfig.baseUrl(`/company/${id}`);

    return this.http
      .get(url);
  }
}
