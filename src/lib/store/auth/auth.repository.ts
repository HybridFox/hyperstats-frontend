import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@api/config';

@Injectable()
export class AuthRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public login() {

  }

  public register(username: string, password: string) {
    const url = this.apiConfig.baseUrl('register');
    this.http
      .post(url, {
        username,
        password
      });
  }
}
