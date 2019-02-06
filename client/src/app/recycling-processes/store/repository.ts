import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';

@Injectable()
export class RecyclingProcessesRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchAll(): Observable<any> {
    const url = this.apiConfig.baseUrl('/recycling-processes');

    return this.http
      .get(url);
  }

  public fetch(id: string): Observable<any> {
    const url = this.apiConfig.baseUrl(`/recycling-processes/${id}`);

    return this.http
      .get(url);
  }

  public create(process: any) {
    const url = this.apiConfig.baseUrl('/recycling-processes');

    return this.http
      .post(url, process);
  }

  public update(process: any) {
    const url = this.apiConfig.baseUrl(`/recycling-processes/${process._id}`);

    return this.http
      .put(url, process);
  }

  public remove(id: string) {
    const url = this.apiConfig.baseUrl(`/recycling-processes/${id}`);

    return this.http
      .delete(url);
  }
}
