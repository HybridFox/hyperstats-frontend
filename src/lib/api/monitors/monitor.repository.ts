import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';
import { map } from 'rxjs/operators';

@Injectable()
export class MonitorRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchAll(): Observable<any> {
    const url = this.apiConfig.baseUrl('/monitors');

    return this.http.get(url);
  }
}
