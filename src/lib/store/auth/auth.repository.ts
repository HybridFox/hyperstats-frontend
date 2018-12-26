import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '@api/config';

@Injectable()
export class AuthRepository {
  constructor(
    private httpClient: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  public login() {

  }
}
