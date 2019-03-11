import { CompanyInterface } from '@api/company/company.interface';

export interface RegisterInterface {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}

export interface ProfileInterface {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
}

export interface LoginInterface {
    username: string;
    password: string;
}

export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    created: string;
    lastUpdated: string;
    company: CompanyInterface;
}

export interface ResetPasswordInterface {
    token: string;
    password: string;
}

export interface RequestPasswordResetInterface {
    username: string;
}
