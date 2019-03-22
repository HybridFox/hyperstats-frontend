import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';
import { ProxyBody } from 'src/app/proxies/store/types';

@Injectable()
export class ProxiesRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchAll(): Observable<any> {
    const url = this.apiConfig.baseUrl('/proxies');

    return this.http.get(url);
  }

  public put(body: ProxyBody): Observable<any> {
    const url = this.apiConfig.baseUrl('/proxies');

    return this.http.put(url, body);
  }
}
