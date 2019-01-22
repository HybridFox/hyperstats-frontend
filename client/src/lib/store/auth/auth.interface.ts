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
    email: string;
    password: string;
}

export interface UserInterface {
    firstname: string;
    lastname: string;
    email: string;
    created: string;
    lastUpdated: string;
}

export interface ResetPasswordInterface {
    token: string;
    password: string;
}

export interface RequestPasswordResetInterface {
    email: string;
}
