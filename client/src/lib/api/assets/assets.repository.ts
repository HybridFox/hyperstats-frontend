import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';
import { retry, map, tap, catchError } from 'rxjs/operators';
import { last } from '@angular/router/src/utils/collection';

@Injectable()
export class AssetsRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public upload(asset): Observable<any> {
    const url = this.apiConfig.baseUrl('/assets');

    const req = new HttpRequest('POST', url, asset, {
      reportProgress: true,
    });

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, asset)),
    );
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * event.loaded / event.total);
        return percentDone;
      case HttpEventType.Response:
        return event.body;
    }
  }

  public getFileURL(fileId) {
    const url = this.apiConfig.baseUrl('/assets') + '/' + fileId;

    return url;
  }
}
