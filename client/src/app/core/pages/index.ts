export * from './login';
export * from './register';
export * from './company-information';

import { LoginPageComponent } from './login';
import { RegisterPageComponent } from './register';
import { CompanyPageComponent } from './company-information';

export const Pages = [
    LoginPageComponent,
    RegisterPageComponent,
    CompanyPageComponent
];
