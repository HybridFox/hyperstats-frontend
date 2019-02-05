import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@api/config.service';

@Injectable()
export class UsersRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchAll() {
    return this.http.get(this.apiConfig.baseUrl('/users'));
  }
}
