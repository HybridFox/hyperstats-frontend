import { Injectable } from '@angular/core';

import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthActions {
  constructor(
    private authRepository: AuthRepository,
  ) {}

  public login() {
    return this.authRepository.login();
  }
}
