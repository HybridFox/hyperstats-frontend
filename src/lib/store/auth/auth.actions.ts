import { Injectable } from '@angular/core';

import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthActions {
  constructor(
    private authRepository: AuthRepository,
  ) {}

  public login({ username, password }) {
    return this.authRepository.login();
  }

  public register({ username, password }) {
    return this.authRepository.register(username, password);
  }

  public isLoggedIn() {
    return true;
  }
}
