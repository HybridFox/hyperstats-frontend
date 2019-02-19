import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';
import { CompanyType } from 'src/app/manage-companies/store/companies/types';
import { UserType } from './types';

@Injectable()
export class UsersRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchByTypes(types: CompanyType[], admin: boolean): Observable<any> {

    return this.http.get(this.apiConfig.baseUrl(`/users`), {
      params: {
        ...(types ? { 'company-type': types } : {}),
        ...(admin ? { 'admin': true } : {}),
      } as any
    });
  }

  public fetchById(id: string): Observable<any> {
    return this.http.get(this.apiConfig.baseUrl(`/users/${id}`));
  }

  public updateUser(user: any): Observable<any> {
    return this.http.put(this.apiConfig.baseUrl(`/users/${user._id}`), user);
  }
}
