import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config';

@Injectable()
export class ReportsRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchAll(): Observable<any> {
    const url = this.apiConfig.baseUrl('/posts');

    return this.http
      .get(url);
  }
}
