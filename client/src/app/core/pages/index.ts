export * from './about';
export * from './login';
export * from './register';
export * from './profile';
export * from './forgot-password';
export * from './reset-password';
export * from './company-information';
export * from './verification-succeeded';
export * from './verification-failed';

import { AboutPageComponent } from './about';
import { LoginPageComponent } from './login';
import { RegisterPageComponent } from './register';
import { ProfilePageComponent } from './profile';
import { ForgotPasswordPageComponent } from './forgot-password';
import { ResetPasswordPageComponent } from './reset-password';
import { CompanyPageComponent } from './company-information';
import { VerificationSucceededPageComponent } from './verification-succeeded';
import { VerificationFailedPageComponent } from './verification-failed';

export const Pages = [
    AboutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    CompanyPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    CompanyPageComponent,
    VerificationSucceededPageComponent,
    VerificationFailedPageComponent
];
