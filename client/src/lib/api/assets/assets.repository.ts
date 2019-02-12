import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';

@Injectable()
export class AssetsRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public upload(assets): Observable<any> {
    const url = this.apiConfig.baseUrl('/assets');

    return this.http
      .post(url, assets);
  }
}
