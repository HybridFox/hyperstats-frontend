export * from './contact';
export * from './login';
export * from './register';

import { ContactPageComponent } from './contact';
import { LoginPageComponent } from './login';
import { RegisterPageComponent } from './register';

export const Pages = [
    LoginPageComponent,
    RegisterPageComponent,
    ContactPageComponent
];
