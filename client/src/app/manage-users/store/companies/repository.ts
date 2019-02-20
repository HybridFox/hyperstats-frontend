import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiConfigService } from '@api/config.service';
import { CompanyType } from 'src/app/manage-companies/store/companies/types';

@Injectable()
export class UserCompanyRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public fetchUserCompanies(): Observable<any> {
    return this.http.get(this.apiConfig.baseUrl(`/companies`), {
      params: {
        type: [CompanyType.CO, CompanyType.R]
      }
    });
  }
}
