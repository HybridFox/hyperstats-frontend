export * from './login';
export * from './register';
export * from './forgot-password';
export * from './reset-password';

import { LoginPageComponent } from './login';
import { RegisterPageComponent } from './register';
import { ForgotPasswordPageComponent } from './forgot-password';
import { ResetPasswordPageComponent } from './reset-password';

export const Pages = [
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent
];
