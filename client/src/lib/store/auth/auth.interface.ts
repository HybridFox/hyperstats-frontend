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
    company: CompanyInterface;
    created: string;
    email: string;
    firstname: string;
    isAdmin: boolean;
    lastUpdated: string;
    lastname: string;
    status: UserInterfaceStatusType;
    username: string;
    validation: UserInterfaceValidationType;
}

interface UserInterfaceStatusType {
  type: 'ACTIVATED' | 'DEACTIVATED' | 'PENDING';
}

interface UserInterfaceValidationType {
  isValidated: boolean;
  token: string;
}

export interface ResetPasswordInterface {
    token: string;
    password: string;
}

export interface RequestPasswordResetInterface {
    username: string;
}
