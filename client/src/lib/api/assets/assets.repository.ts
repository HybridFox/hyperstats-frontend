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

  public upload(file: File): Observable<any> {
    const url = this.apiConfig.baseUrl('/assets');

    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
    });

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
    );
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        const progress = {
          progress: Math.round(100 * event.loaded / event.total),
          originalname: file.name,
          result: null
        };
        return progress;
      case HttpEventType.Response:
        const result = {
          progress: 100,
          originalname: file.name,
          result: event.body
        };
        return result;
    }
  }

  public getFileURL(fileId) {
    const url = this.apiConfig.baseUrl('/assets') + '/' + fileId;

    return url;
  }
}
