import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@api/config.service';
import { Observable } from 'rxjs';

import {
  ResetPasswordInterface,
  RegisterInterface,
  LoginInterface,
  RequestPasswordResetInterface,
  ProfileInterface
} from './auth.interface';
import { CompanyData } from '@api/company/company.types';

@Injectable()
export class AuthRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public login({ username, password }: LoginInterface) {
    const url = this.apiConfig.baseUrl('/auth/login');

    return this.http
      .post(url, {
        username,
        password
      });
  }

  public fetchProfile() {
    const url = this.apiConfig.baseUrl('/profile');

    return this.http
      .get(url);
  }

  public updateProfile({ email, firstname, lastname, password }: ProfileInterface) {
    const url = this.apiConfig.baseUrl('/profile');

    return this.http
      .put(url, {
        email,
        firstname,
        lastname,
        password
      });
  }

  public updateProfileCompany(company:  CompanyData) {
    const url = this.apiConfig.baseUrl('/profile/company');

    return this.http
      .put(url, company);
  }

  public requestPasswordReset({ username }: RequestPasswordResetInterface) {
    const url = this.apiConfig.baseUrl('/auth/request-password-reset');

    return this.http
      .post(url, {
        username
      });
  }

  public resendValidateMail(user) {
    const url = this.apiConfig.baseUrl('/auth/resend-validate-mail');

    return this.http
      .post(url, {
        user
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

  public resetPassword({ password, token }: ResetPasswordInterface) {
    const url = this.apiConfig.baseUrl('/auth/reset-password');

    return this.http
      .put(url, {
        password,
        token
      });
  }
}
