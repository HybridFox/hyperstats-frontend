export * from './about';
export * from './login';
export * from './register';
export * from './company-information';
export * from './verification-succeeded';
export * from './verification-failed';

import { AboutPageComponent } from './about';
import { LoginPageComponent } from './login';
import { RegisterPageComponent } from './register';
import { CompanyPageComponent } from './company-information';
import { VerificationSucceededPageComponent } from './verification-succeeded';
import { VerificationFailedPageComponent } from './verification-failed';

export const Pages = [
    AboutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CompanyPageComponent,
    VerificationSucceededPageComponent,
    VerificationFailedPageComponent
];
