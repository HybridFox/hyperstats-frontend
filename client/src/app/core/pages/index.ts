export * from './login';
export * from './register';
export * from './forgot-password';

import { LoginPageComponent } from './login';
import { RegisterPageComponent } from './register';
import { ForgotPasswordPageComponent } from './forgot-password';

export const Pages = [
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent
];
