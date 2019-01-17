import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@api/config.service';
import { Observable } from 'rxjs';
import { ProfileInterface, RegisterInterface } from './auth.interface';

@Injectable()
export class AuthRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public login({ email, password }) {
    const url = this.apiConfig.baseUrl('/auth/login');

    return this.http
      .post(url, {
        email,
        password
      });
  }

  public fetchProfile() {
    const url = this.apiConfig.baseUrl('/auth/profile');

    return this.http
      .get(url);
  }

  public updateProfile({ email, firstname, lastname, password }: ProfileInterface) {
    const url = this.apiConfig.baseUrl('/auth/profile');

    return this.http
      .put(url, {
        email,
        firstname,
        lastname,
        password
      });
  }

  public register({ firstname, lastname, email, password }: RegisterInterface): Observable<any> {
    const url = this.apiConfig.baseUrl('/auth/register');

    return this.http
      .post(url, {
        email,
        firstname,
        lastname,
        password
      });
  }

  public logout() {
    const url = this.apiConfig.baseUrl('/auth/logout');

    return this.http
      .get(url);
  }
}
