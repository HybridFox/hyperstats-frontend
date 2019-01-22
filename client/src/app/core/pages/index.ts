export * from './about';
export * from './login';
export * from './register';
export * from './forgot-password';
export * from './reset-password';
export * from './company-information';
export * from './verification-succeeded';
export * from './verification-failed';
export * from './help';

import { AboutPageComponent } from './about';
import { LoginPageComponent } from './login';
import { RegisterPageComponent } from './register';
import { ForgotPasswordPageComponent } from './forgot-password';
import { ResetPasswordPageComponent } from './reset-password';
import { CompanyPageComponent } from './company-information';
import { VerificationSucceededPageComponent } from './verification-succeeded';
import { VerificationFailedPageComponent } from './verification-failed';
import { HelpPageComponent, HelpSectionPageComponent } from './help';

export const Pages = [
    AboutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    CompanyPageComponent,
    VerificationSucceededPageComponent,
    VerificationFailedPageComponent,
    HelpPageComponent,
    HelpSectionPageComponent
];
