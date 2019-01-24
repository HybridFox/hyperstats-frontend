import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiConfigService } from '@api/config.service';
import { CompanyInterface } from './company.interface';

@Injectable()
export class CompanyRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public update({ ...company }: CompanyInterface): Promise<any> {
    const url = this.apiConfig.baseUrl('/profile/company');

    return this.http
      .put(url, { ...company })
      .toPromise();
  }
}
