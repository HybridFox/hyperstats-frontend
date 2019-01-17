export * from './about';
export * from './login';
export * from './register';
export * from './forgot-password';
export * from './reset-password';
export * from './company-information';

import { AboutPageComponent } from './about';
import { LoginPageComponent } from './login';
import { RegisterPageComponent } from './register';
import { ForgotPasswordPageComponent } from './forgot-password';
import { ResetPasswordPageComponent } from './reset-password';
import { CompanyPageComponent } from './company-information';

export const Pages = [
    AboutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    CompanyPageComponent
];
