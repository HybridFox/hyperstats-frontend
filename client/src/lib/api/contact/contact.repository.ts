import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApiConfigService } from '@api/config.service';

import { ContactInterface } from './contact.interface';

@Injectable()
export class ContactRepository {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public sendMail({ ...contactInfo }: ContactInterface): Promise<any> {
    const url = this.apiConfig.baseUrl('/contact/send-mail');

    return this.http
      .post(url, { ...contactInfo })
      .toPromise();
  }
}
